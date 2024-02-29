const AWS = require('aws-sdk')
const lambda = new AWS.Lambda();

/**{
  "active": false,
  "flowCode": 2
}*/

exports.handler = async (event) => {
    let flowCodes = {
        1: process.env.LAMBDAS_NAME_1,
        2: process.env.LAMBDAS_NAME_2
    }
    let triggerUUIDs = []
    let functions = flowCodes[event.flowCode]?.split(" ")
    console.log(JSON.stringify(functions))
    for (const functionName of functions) {
        const params = {
            FunctionName: event.flowCode === 1 ? 'mave-'.concat(functionName).concat('-lbda-pullSQS') : functionName
        };
        console.log(JSON.stringify(params))
        const response = await lambda.listEventSourceMappings(params).promise();
        console.log(response.EventSourceMappings[0].UUID);
        triggerUUIDs.push(response.EventSourceMappings[0].UUID)
    }

    for (const id of triggerUUIDs) {
        const params = {
            UUID: id,
            Enabled: event.active
        };
        const response = await lambda.updateEventSourceMapping(params).promise();
        console.log(`${id} was ${event.active ? '' : 'de'}activated for flowCode ${event.flowCode ? 'SFL-AFV': 'AFV-SFL'}`);
    }
        console.log(`${functions.length} requested and ${triggerUUIDs.length} processed`);

};

