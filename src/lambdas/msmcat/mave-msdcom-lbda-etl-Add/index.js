const sendEventLog = require("/opt/sendEvent/sendEvent");
const sendFailed = require("/opt/sendEvent/sendFailed");

const buildJson = require("./buildJson");
const buildPayload = require("./buildPayload");
const checkRawData = require("./checkFields/checkRawData");
const {
  addMarcacatalogo
} = require("./queries/query");

exports.handler = async (event) => {
  console.log(JSON.stringify(event));

  let action = event.detail.action;
  let schema = event.detail.schema;
  let data = buildJson(event.detail.data, schema, event.detail.entity);
  let response = {
    action,
    schema,
    data: {},
  };
  let source = `mcat.etl.${action}`;

  // No es necesario un Loop, ya que se recibe una entidad de marca cataslogo.
  for (const entity in data) {
    let checkData = checkRawData(data[entity], entity);

    if (checkData.invalidFields.length > 0) {
      let typeError = "Undefined or wrong type";
      const eventData = await sendFailed(
        checkData,
        data,
        source,
        typeError,
        schema,
        entity
      );
      return eventData;
    }

    let container = await buildPayload(data[entity], entity);

    if (container.invalidFields?.length > 0) {
      let typeError = "Invalid";
      const eventData = await sendFailed(
        container,
        data,
        source,
        typeError,
        schema,
        entity
      );
      return eventData;
    }

    response.data[entity] = container.response;
  }

  // ENVIO INDIVIDUAL A PROCESAMIENTO DE DATOS (Ya aquí está verificado todo)
  for (const item of Object.keys(response.data)) {
    if (item === "marcacatalogo")
      await addMarcacatalogo({ action, schema, data: response.data[item] });
  }

  console.log(await sendEventLog("completed", source, response));

  return response;
};
