const { getFirstCoordinaciones } = require("../queries/query");

let response = {};
let invalidFields = [];

const checkStatus = (name, status) => {
  if (status.toLowerCase() == "s") return 2;
  if (status.toLowerCase() == "n") return 4;
  return invalidFields.push({ [`${name}`]: status });
};

const entityMarcacatalogo = async (payload) => {
  response = {};
  invalidFields = [];

  response.IDMARCA = payload.IDMARCA;
  response.ABREVIADO = payload.ABREVIADO;
  response.DESCRIPCION = payload.DESCRIPCION;
  response.LOGO = payload.LOGO;
  response.ACTIVO = checkStatus("ACTIVO", payload.ACTIVO);

  return { invalidFields, response };
};

module.exports = entityMarcacatalogo;
