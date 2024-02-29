let checkFields = require("./checkFields");
let entitiesFields = require("./entitiesFields");

const checkData = (payload, entity) => {
  // Check the primary keys of the entity
  let invalidFields = [];
  let invalidOptional = [];
  let fields = entitiesFields[entity];

  invalidFields.push(...checkFields(payload.pk, fields.pk));

  // Pass the fields that we want to check in this case we have optionals fields
  invalidOptional.push(...checkFields(payload.update, fields.update));

  if (Object.keys(payload.update).length === 0) {
    invalidOptional = fields.update;
  }

  return {
    invalidFields,
    optionalFound: fields.update.length - invalidOptional.length,
    invalidOptional,
  };
};

module.exports = checkData;
