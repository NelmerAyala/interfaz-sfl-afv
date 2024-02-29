const { Parser } = require('node-sql-parser');
const parser = new Parser();
const getMicroservice = require("./microservice_list");
const schema_list = require("./schema_list");
const publishToSNS = require("/opt/publishToSNS");
const { entityExist, checkEntityFields } = require("./entities_check");

// CONDICIÓN RECURSIVA
const getConditions = (condition) => {
    if (condition.operator === "AND" || condition.operator === "OR") {
        return {
            ...getConditions(condition.left),
            ...getConditions(condition.right)
        };
    }
    return {
        [condition.left.column]: condition.right.value
    };
};

// PRINCIPAL
exports.handler = async (event) => {
    
    console.log(event);
    
    let query = event.value;
    let errorData = [];
    let body = {
        CASA: schema_list[event.schema],
        schema: event.schema,
        data: []
    };
    
    // SCHEMA
    // body.schema = event.schema;
    
    // CASA
    // body.CASA = schema_list[event.schema];
    
    // SQL PARSING
    const astQuery = parser.astify(query);
    
    // SE VALIDA LA ENTIDAD (TABLA) CORRECTA
    let entity = astQuery.table[0].table ? astQuery.table[0].table : event.entity;
    if (!entityExist(entity))
        return console.error({ 
            statusCode: 422, 
            body: `Unprocessable entity: ${entity}` 
        });
    
    // EXTRAER DATA SEGÚN TIPO DE LA QUERY (INSERT, UPDATE, DELETE)
    if (astQuery.type == "insert") {
        let newValue = {};
        astQuery.values.forEach((itemValues, i) => {
            astQuery.columns.forEach((item, index) => {
                newValue[item] = itemValues.value[index].value;
            });  
            body.data.push({ ...newValue });
        });
    } else if (astQuery.type == "update")
        astQuery.set.forEach(item => body.data[item.column] = item.value.value);
    else if (astQuery.type == "delete")
        body.data = getConditions(astQuery.where);
    
    // VERIFICACIÓN DE DATA 
    for(const [index, item] of body.data.entries()) {
        let checkData = await checkEntityFields(item, entity, body.schema);
        [body.data[index], errorData[index]] = [...checkData];
    }
    // body.data.forEach((item, index) => {
    //     let checkData = await checkEntityFields(item, entity, body.schema);
    //     [body.data[index], errorData[index]] = [...]});

    // LIMPIEZA DE DATA
    body.data = body.data.filter(item => Object.keys(item).length != 0);
    errorData = errorData.filter(item => Object.keys(item).length != 0);
        
    // SI EXISTEN REGISTROS INVALIDOS, IMPRIME EL LOG        
    if (errorData.length != 0) 
        console.log(`INVALID RECORDS: ${JSON.stringify(errorData)}`);
    
    // SI TODO SE PROCESÓ CORRECTAMENTE, SE ENVÍA A LA COLA SNS CON LOS PARAMETROS:
    const attributes = {
        ID_MICROSERVICIO: { 
            DataType: 'Number', 
            StringValue: `${getMicroservice(entity)}` 
        }
    };
    for (const item of body.data) {
        await publishToSNS(
            {
                body: {
                    CASA: body.CASA,
                    schema: body.schema,
                    data: item
                },
                snsARN: process.env.SNS_ARN
            },
            attributes
        );
    }
    
    console.log(`
        Total Processed Items: ${body.data.length}
        Total Invalid Items: ${errorData.length}
        Entity: ${entity}
        `);
    
    return {
        statusCode: 200,
        body: {
            message: "The request has been sent correctly.",
            totalItems: body.data.length
        }
    };

};
