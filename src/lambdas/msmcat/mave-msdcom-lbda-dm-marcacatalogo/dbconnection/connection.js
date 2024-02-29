const SecretsManager = require("/opt/SecretsManager");
const mysql = require("mysql");
const houses = require("./houses");

// OBTENCION DE SECRETO
const connection = async (schema) => {
  let secretID = houses[schema];
  let region = process.env.REGION;

  try {
    const getSecret = await SecretsManager.getSecret(secretID, region);

    let secret = JSON.parse(getSecret);

    let params = {
      host: secret.host,
      port: secret.port,
      user: secret.username,
      password: secret.password,
      database: secret.schema,
      multipleStatements: true,
    };

    return await mysql.createConnection(params);
  } catch (err) {
    console.error(err);
    return null;
  }
};

module.exports = connection;
