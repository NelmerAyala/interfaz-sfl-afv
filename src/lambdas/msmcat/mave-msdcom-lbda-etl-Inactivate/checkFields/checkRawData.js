// Check raw data

let checkFields = require("./checkFields");
let entitiesFields = require("./entitiesFields");

const checkData = (payload, entity) => {
  let invalidFields = [];
  invalidFields.push(...checkFields(payload, entitiesFields[entity]));
  return { invalidFields };
};

module.exports = checkData;
