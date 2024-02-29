const axio = require("axios");

async function updateMarcacatalogo(body) {
  try {
    const response = await axio.post(`${process.env.API_URL}/marcacatalogo`, body);
    return response.data.body;
  } catch (e) {
    return e;
  }
}

async function getMarcacatalogoByID(schema, IDMARCA) {
  try {
    const response = await axio.post(`${process.env.API_URL}/marcacatalogo`, {
      action: "getByID",
      schema,
      data: { IDMARCA: IDMARCA },
    });
    return response.data.body;
  } catch (e) {
    return e;
  }
}

module.exports = {
  updateMarcacatalogo,
  getMarcacatalogoByID
};
