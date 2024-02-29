const { getLoginColabByID } = require("./query");

// ENTIDAD Y KEYS DE VALIDACION
const entityFields = {
    anexo: ["IDANEXO", "IDZONA", "USUARIOCREACION"],
    orden_lote: ["NUMORDEN", "IDCLIENTE", "FECHAEMISION"],
    recibo: ["IDRECIBO", "IDZONA", "USUARIOCREACION"],
    retencion: ["IDRETENCION", "IDZONA", "USUARIOCREACION"]
};

// VALIDA LA ENTIDAD
const entityExist = (entity) => entityFields.hasOwnProperty(entity);

// VALIDA LOS CAMPOS DE LA ENTIDAD
const checkEntityFields = async (data, entity, schema) => {
    
    let fixedData = {};
    let errorData = {};
    
    entityFields[entity].forEach(item => {
        if (data.hasOwnProperty(item)) fixedData[item] = data[item];
        else errorData[item] = data[item];
    });
    
    // SE VERIFICAN CIERTOS CAMPOS DEPENDIENDO DE LA TABLA MANIPULADA
    if (entity == "anexo") {
        let logincolab = await getLoginColab(schema, data.IDCOLABORADOR);
        if (!logincolab) {
            errorData = { 
                ...fixedData, 
                IDCOLABORADOR: data.IDCOLABORADOR 
            };
            fixedData = {};    
        }
        else if(data.STATUSREGISTRO != "V" || logincolab.IDCANALVENTA == 9) {
            errorData = { 
                ...fixedData, 
                STATUSREGISTRO: data.STATUSREGISTRO,
                IDCANALVENTA: logincolab.IDCANALVENTA 
            };
            fixedData = {};  
        }
    }
    else if (entity == "orden_lote" && (data.STATUSREGISTRO != 2 || data.IDCANALVENTA == 9)) {
        errorData = { 
            ...fixedData, 
            STATUSREGISTRO: data.STATUSREGISTRO,
            IDCANALVENTA: data.IDCANALVENTA 
        };
        fixedData = {};
    }
    else if (entity == "recibo" && (data.ESTATUSREGISTRO != "V" || data.IDCANALVENTA == 9)) {
        errorData = { 
            ...fixedData, 
            ESTATUSREGISTRO: data.ESTATUSREGISTRO,
            IDCANALVENTA: data.IDCANALVENTA 
        };
        fixedData = {};
    }
    else if (entity == "retencion" && (data.ESTATUSREGISTRO != "V" || data.IDCANALVENTA == 9)) {
        errorData = { 
            ...fixedData, 
            ESTATUSREGISTRO: data.ESTATUSREGISTRO,
            IDCANALVENTA: data.IDCANALVENTA 
        };
        fixedData = {};
    }
    
    return [ fixedData, errorData ];
};

async function getLoginColab (schema, IDCOLABORADORES) { 
    return await getLoginColabByID(schema, IDCOLABORADORES).then(value => 
            value ? value : null
        );
}

module.exports = { entityExist, checkEntityFields};