const sendEventLog = require("./sendEvent");

const sendFailed = async (
  checkData,
  payload,
  source,
  typeError,
  CASA,
  entity
) => {
  payload.error = `entity ${entity}, ${typeError} field(s):`;
  payload.CASA = CASA;

  if (checkData.invalidFields.length > 0) {
    payload.error += ` ${JSON.stringify(checkData.invalidFields)}`;
  }

  if (checkData.invalidOptional?.length > 0) {
    payload.error += ` ${JSON.stringify(checkData.invalidOptional)}`;
  }

  let action = "failed";

  const eventData = await sendEventLog(action, source, payload);
  return eventData;
};

module.exports = sendFailed;
