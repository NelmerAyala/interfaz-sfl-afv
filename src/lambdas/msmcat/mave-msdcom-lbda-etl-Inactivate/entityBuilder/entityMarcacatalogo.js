let response = {};
let invalidFields = [];
const { getMarcacatalogoByID } = require("../queries/query");

// SE VALIDA QUE LA MARCA EXISTA
async function validateAndSetCliente(schema, IDMARCA) {
  await getMarcacatalogoByID(schema, IDMARCA).then((value) => {
    if (!value) {
      invalidFields.push({ IDMARCA: IDMARCA });
    }
    response.IDMARCA = IDMARCA;
  });
}

const entityMarcacatalogo = async (payload) => {
  response = {};
  invalidFields = [];

  // Build response
  await validateAndSetMarcacatalogo(payload.schema, payload.IDMARCA);

  return { invalidFields, response };
};

module.exports = entityMarcacatalogo;
