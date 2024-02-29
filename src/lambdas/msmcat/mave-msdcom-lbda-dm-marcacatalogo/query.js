const formatValues = require("formater");
const transaction = require("./dbconnection/transaction");

const query = async (event) => {
  const DB = process.env.TABLE;
  let keys = [];
  let values = [];
  let queryString = "";
  let isList = false;
  let isMutation = false;

  for (const [key, value] of Object.entries(event.data)) {
    keys.push(key);
    values.push(value);
  }

  // MUTATIONS
  if (event.action === "inactivate") {
    queryString = `UPDATE ${DB} 
            SET ACTIVO=${event.data.ACTIVO} 
            WHERE IDMARCA=${event.data.IDMARCA}`;
  }

  if (event.action === "add") {
    isMutation = true;
    let isUpdate = false;
    queryString = `INSERT INTO ${DB} (${keys.join(", ")}) 
            VALUES (${formatValues(keys, values, isUpdate).join(",")});
            SELECT ${keys.join(", ")} FROM ${DB} 
            WHERE IDMARCA=${event.data.IDMARCA}`;
  }

  if (event.action === "update") {
    isMutation = true;
    let isUpdate = true;
    queryString = `UPDATE ${DB} 
            SET ${formatValues(keys, values, isUpdate)} 
            WHERE IDMARCA=${event.data.IDMARCA};
            SELECT ${keys.join(", ")} FROM ${DB} 
            WHERE IDMARCA=${event.data.IDMARCA}`;
  }

  // QUERIES
  if (event.action === "getAll") {
    isList = true;
    queryString = `SELECT ${keys.join(", ")} FROM ${DB}`;
  }

  if (event.action === "getByID")
    queryString = `SELECT ${keys.join(", ")} FROM ${DB} 
            WHERE IDMARCA=${event.data.IDMARCA}`;

  if (event.action === "getByABREVIADO")
    queryString = `SELECT ${keys.join(", ")} FROM ${DB} 
            WHERE ABREVIADO='${event.data.ABREVIADO}'`;

  // console.log(queryString);
  return await transaction(event.schema, queryString, isList, isMutation);
};

module.exports = query;
