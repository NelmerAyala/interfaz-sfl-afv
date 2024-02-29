const buildJson = (rawData, schema, entity) => {
  let marcacatalogo = { pk: {}, update: {} };
  let response = {};

  // Marca catalogo
  if (entity == "marcacatalogo") {
    marcacatalogo.pk.IDMARCA = rawData.IDMARCA;
    marcacatalogo.update.ABREVIADO = rawData.ABREVIADO;
    marcacatalogo.update.DESCRIPCION = rawData.DESCRIPCION;
    marcacatalogo.update.LOGO = rawData.LOGO;
    marcacatalogo.update.ACTIVO = rawData.ACTIVO;
    marcacatalogo.schema = schema;
    response.marcacatalogo = marcacatalogo;
  }

  for (const entity in response) {
    response[entity] = deleteUndefined(response[entity]);
  }

  return response;
};

function deleteUndefined(entity) {
  for (const field in entity.update) {
    if (entity.update[field] === undefined) delete entity.update[field];
  }
  return entity;
}

module.exports = buildJson;
