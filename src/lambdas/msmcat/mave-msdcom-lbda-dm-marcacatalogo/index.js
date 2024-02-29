const query = require("query");

exports.handler = async (event) => {
  console.log(event);

  let response = await query(event);

  console.log(response);

  return response;
};
