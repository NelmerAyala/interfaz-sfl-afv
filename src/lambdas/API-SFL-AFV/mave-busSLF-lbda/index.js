const { getMicroservice, getEntity } = require("./microservice_list");
const houses = require("./schema_list");
const action = require("./action_list");
const publishToSNS = require("/opt/publishToSNS");

exports.handler = async (event) => {
  console.log({
    path: event.path,
    httpMethod: event.httpMethod,
    body: event.body,
  });

  let response = {};
  let record = {};
  let body = {};

  // SE EXTRAE LA LISTA DE REGISTROS
  try {
    record = JSON.parse(event.body);
  } catch (err) {
    response = {
      statusCode: 400,
      body: JSON.stringify({
        message: `${err} (Invalid payload format, must be a single JSON request)`,
        path: event.path,
        httpMethod: event.httpMethod,
        body: event.body,
      }),
    };
  }

  // SI EL FORMATO DE ENVIO FUE EL INCORRECTO
  if (response.statusCode == 400) {
    console.error({ ...response, body: JSON.parse(response.body) });
    return response;
  }

  // SE VERIFICA QUE SEA UNA REQUEST JSON
  if (typeof record !== "object" || record === null) {
    response = {
      statusCode: 400,
      body: JSON.stringify({
        message: "Invalid payload format",
        body: record,
      }),
    };
    console.error(response);

    return response;
  }

  // CASA INVÁLIDA? Se notifica y no se envía
  if (typeof record.CASA != "number" || record.CASA < 0) {
    response = {
      statusCode: 400,
      body: JSON.stringify({
        message: `Invalid CASA (int): '${record.CASA}' (${typeof record.CASA})`,
        body: record,
      }),
    };
    console.error(response);
    return response;
  }

  // ASIGNAR ACTION, SCHEMA Y DATA
  body.action = action[event.httpMethod];
  body.schema = houses[record.CASA];
  body.entity = getEntity(event.path);
  body.data = { ...record };
  delete body.data.CASA;

  // ENVIO SNS
  const params = { body, snsARN: process.env.SNS_ARN };
  const attributes = {
    ID_MICROSERVICIO: {
      DataType: "Number",
      StringValue: `${getMicroservice(event.path)}`,
    },
  };

  await publishToSNS(params, attributes);

  response = {
    statusCode: 200,
    body: JSON.stringify({
      message: "The request has been sent correctly.",
    }),
  };
  return response;
};
