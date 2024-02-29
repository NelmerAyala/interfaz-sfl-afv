const connect = require("./connection");

// QUERY CONNECTION
const connectQuery = (connection, query) =>
  new Promise((resolve, reject) =>
    connection.query(query, (error, results, fields) =>
      error ? reject(error) : resolve(results)
    )
  );

// TRANSACCIÓN
const transaction = async (schema, query, isList, isMutation) => {
  let response = {};
  let connection = await connect(schema);

  // CONEXIÓN
  try {
    // INICIO DE TRANSACCIÓN
    await connection.beginTransaction();

    let queryResponse = await connectQuery(connection, query);

    response.body = isList
      ? queryResponse
      : isMutation
      ? queryResponse[1][0]
      : queryResponse[0];

    response.statusCode = 200;

    await connection.commit();
  } catch (error) {
    // CAPTURA DE ERROR
    // console.error(error);
    await connection.rollback();
    response = { statusCode: 400, error };
  } finally {
    // FINALIZA LA CONEXIÓN
    // await connection.end();
    await new Promise((resolve, reject) =>
      connection.end((err) => (err ? reject(err) : resolve()))
    );
  }

  return response;
};

module.exports = transaction;
