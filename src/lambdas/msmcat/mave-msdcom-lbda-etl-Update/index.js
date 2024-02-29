const sendEventLog = require("/opt/sendEvent/sendEvent");
const sendEventLogUpdate = require("/opt/sendEvent/sendEvent");
const sendFailed = require("/opt/sendEvent/sendFailed");
const buildJson = require("./buildJson");
const buildPayload = require("./buildPayload");
const checkRawData = require("./checkFields/checkRawData");
const {
  updateMarcacatalogo
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
  let changeZona = false;

  // No es necesario un Loop, ya que se recibe una entidad de Maraca catalogo.
  for (const entity in data) {
    let checkData = checkRawData(data[entity], entity);

    if (
      checkData.invalidFields.length > 0 ||
      checkData.optionalFound === 0 ||
      checkData.optionalFound !== Object.keys(data[entity].update).length
    ) {
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

    response.data[entity] = container.response;
  }

  // ENVIO INDIVIDUAL A PROCESAMIENTO DE DATOS (Ya aquí está verificado todo)
  for (const item of Object.keys(response.data)) {
    if (item === "marcaccatalogo")
      await updateMarcacatalogo({ action, schema, data: response.data[item] });
  }

  console.log(await sendEventLog("completed", source, response));

  return response;
};
