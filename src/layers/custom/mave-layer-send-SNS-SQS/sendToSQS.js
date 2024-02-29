const AWS = require("aws-sdk");
const sqs = new AWS.SQS();

/**
ESTRUCTURA DE PARAMETROS PARA ENVIO A SQS
@params = {
   body: { },                  // Cuerpo del mensaje
   sqsURL: " "                 // URL de la SQS
}
ESTRUCTURA DE ATRIBUTOS DE MICROSERVICIO CORRESPONDIENTE PARA ENVIO SQS (sin definir)
@attributes = {};
*/

// ENVIO HACIA SQS
const sendToSQS = async (params, attributes = {}) => {
  // PARAMETROS DE ENVIO PARA SNS
  let groupID = new Date().getTime();
  let dupGroupID = Math.floor(Math.random() * groupID);

  let parameters = {
    MessageGroupId: `${groupID}`,
    MessageDeduplicationId: `${dupGroupID}`,
    MessageBody: JSON.stringify(params.body),
    MessageAttributes: attributes,
    QueueUrl: params.sqsURL,
  };

  try {
    const data = await sqs.sendMessage(parameters).promise();
    console.log(
      "Message published to SQS with data: " +
        JSON.stringify({ ...data, body: params.body })
    );
    return true;
  } catch (err) {
    console.error({
      statusCode: err.statusCode,
      message: err.message,
    });
    return false;
  }
};

module.exports = sendToSQS;
