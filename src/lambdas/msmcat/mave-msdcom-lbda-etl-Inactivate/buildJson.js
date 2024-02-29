const buildJson = (rawData, schema, entity) => {
  let marcacatalogo = {};
  let response = {};

  // Marcacatalogo
  if (entity == "marcacatalogo") {
    marcacatalogo.IDMARCA = rawData.IDMARCA;
    marcacatalogo.schema = schema;
    response.marcacatalogo = marcacatalogo;
  }

  return response;
};

module.exports = buildJson;
