const axio = require('axios');

async function getLoginColabByID(schema, IDCOLABORADORES) {
    try {
        const response = await axio.post(
            `${process.env.API_COLAB_URL}/login-collaborator`,
            {
                action: "getByIDCOLABORADORES",
                schema,
                data: { 
                    IDCOLABORADORES: IDCOLABORADORES,
                    IDCANALVENTA: null
                }
            });
        return response.data.body;
    } catch (e) {
        return e;
    }
}

module.exports = { 
    getLoginColabByID
};