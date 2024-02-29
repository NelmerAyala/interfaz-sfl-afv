const AWS = require("aws-sdk");

const eventbridge = new AWS.EventBridge();

const sendEvent = (detailType, source, body) => {
  var params = {
    Entries: [
      {
        Detail: JSON.stringify(body),
        DetailType: detailType,
        Source: source,
      },
    ],
  };

  return eventbridge.putEvents(params).promise();
};

module.exports = sendEvent;
