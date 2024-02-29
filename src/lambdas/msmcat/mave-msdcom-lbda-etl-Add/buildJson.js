const buildJson = (rawData, schema, entity) => {

    let marcacatalogo = {};
    let response = {};
    
    // MarcaCatalogo
    if (entity == "marcacatalogo") {
        marcacatalogo.IDMARCA = rawData.IDMARCA;
        marcacatalogo.ABREVIADO = rawData.ABREVIADO;
        marcacatalogo.DESCRIPCION = rawData.DESCRIPCION;
        marcacatalogo.LOGO = rawData.LOGO;
        marcacatalogo.ACTIVO = rawData.ACTIVO;
        marcacatalogo.schema = schema;
        response.marcacatalogo = marcacatalogo;
    }
    
    return response;
  
};

module.exports = buildJson;
