const sendEventLog = require("/opt/sendEvent/sendEvent");

exports.handler = async (event) => {
  console.log(event);
  let statusCode = 200;
  let source = "mcat.pullSQS.";
  let detailType = "";
  let err = [];

  for (let record of event.Records) {
    let databody = JSON.parse(record.body);

    if (databody.hasOwnProperty("Message"))
      databody = JSON.parse(databody.Message);

    console.log(databody);

    if (!databody.action) {
      err.push(databody);
      console.log("Missing action field");
      continue;
    } else if (
      databody.action != "add" &&
      databody.action != "update" &&
      databody.action != "inactivate"
    ) {
      err.push(databody);
      console.log(`Undefined action: "${databody.action}"`);
      continue;
    }

    detailType = `${databody.action}`;
    source = "mcat.pullSQS." + `${databody.action}`;

    const data = await sendEventLog(detailType, source, databody);
    console.log(data);
  }

  if (err.length > 0) {
    err.length < event.Records.length ? (statusCode = 204) : (statusCode = 400);
  }

  let response = {
    statusCode,
    body: {
      totalItems: event.Records.length,
      succeedItems: event.Records.length - err.length,
      failedItems: err.length,
      errorItems: err,
    },
  };
  console.log(response);

  return response;
};
