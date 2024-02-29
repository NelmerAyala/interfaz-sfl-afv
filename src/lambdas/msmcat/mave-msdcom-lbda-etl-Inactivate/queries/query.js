const axio = require("axios");

async function addMarcacatalogo(body) {
  try {
    const response = await axio.post(`${process.env.API_URL}/marcaCatalogo`, body);
    return response.data.body;
  } catch (e) {
    return e;
  }
}

async function getMarcacatalogoByID(schema, IDZONAS) {
  try {
    const response = await axio.post(`${process.env.API_URL}/marcaCatalogo`, {
      action: "getByID",
      schema,
      data: { IDMARCA: IDMARCA },
    });
    return response.data.body;
  } catch (e) {
    return e;
  }
}

async function getMarcacatalogoByAbreviado(schema, IDCLIENTE, IDZONAS) {
  try {
    const response = await axio.post(`${process.env.API_URL}/marcaCatalogo`, {
      action: "getByABREVIADO",
      schema,
      data: { ABREVIADO: ABREVIADO},
    });
    return response.data.body;
  } catch (e) {
    return e;
  }
}

async function deleteMarcacatalogoByID(schema, IDMARCA) {
  try {
    const response = await axio.post(
      `${process.env.API_URL}/marcaCatalogo`, {
        action: "deleteMarcacatalogoByID",
        schema,
        data: { IDMARCA: IDMARCA }
    });
    return response.data.body;
  } catch (e) {
    return e;
  }
}


module.exports = {
  addMarcacatalogo,
  getMarcacatalogoByID,
  getMarcacatalogoByAbreviado,
  deleteMarcacatalogoByID
};
