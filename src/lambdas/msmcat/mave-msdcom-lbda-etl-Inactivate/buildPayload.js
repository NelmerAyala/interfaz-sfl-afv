let entityMarcaCatalogo = require("./entityBuilder/entityMarcacatalogo");

const buildPayload = async (rawData, containerType) => {
  let payload = {};

  payload = await entityMarcaCatalogo(rawData);

  return payload;
};

module.exports = buildPayload;
