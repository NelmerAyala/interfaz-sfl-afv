let entityMarcacatalogo = require("./entityBuilder/entityMarcacatalogo");

const buildPayload = async (rawData, containerType) => {
  let payload = {};

  if (containerType == "marcacatalogo") 
    payload = await entityMarcacatalogo(rawData);

  return payload;
};

module.exports = buildPayload;
