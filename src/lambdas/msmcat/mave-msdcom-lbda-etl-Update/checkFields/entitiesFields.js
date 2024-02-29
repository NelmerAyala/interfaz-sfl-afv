const entitiesFields = {
    marcacatalogo: {
        pk: [{ IDMARCA: 'number' }],
        update: [
            { ABREVIADO: 'string' },
            { DESCRIPCION: 'string' }
        ]
    }
};

module.exports = entitiesFields;
