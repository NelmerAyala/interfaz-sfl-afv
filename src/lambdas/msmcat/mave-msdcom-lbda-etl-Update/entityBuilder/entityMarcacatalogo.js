let response = {};
let invalidFields = [];

const checkStatus = (name, status) => {
  if (status) {
    if (status.toLowerCase() == "s") return 2;
    if (status.toLowerCase() == "n") return 4;
    return invalidFields.push({ [`${name}`]: status });
  }
};

const entityMarcacatalogo = async (payload) => {
  response = {};
  invalidFields = [];

  // Build response
  response.IDMARCA = payload.pk.IDMARCA;
  response.ABREVIADO = payload.update.ABREVIADO;
  response.DESCRIPCION = payload.update.DESCRIPCION;
  response.ESTADO = checkStatus("IDSTATUS", payload.update.ESTADO);

  return { invalidFields, response };
};

module.exports = entityMarcacatalogo;
