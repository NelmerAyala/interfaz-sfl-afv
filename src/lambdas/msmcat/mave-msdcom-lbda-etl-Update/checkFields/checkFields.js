// check if the required fields are defined
const checkFields = (payload, fields) => {
  let invalidFields = [];
  fields.map((i) => {
    let field = `${Object.keys(i)[0]}`;
    let typeField = `${Object.values(i)[0]}`;

    (payload.hasOwnProperty(field) &&
      payload[field] !== "" &&
      typeof payload[field] === typeField) ||
      invalidFields.push(i);
  });

  return invalidFields;
};

module.exports = checkFields;
