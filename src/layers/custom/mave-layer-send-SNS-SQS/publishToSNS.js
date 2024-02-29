const AWS = require("aws-sdk");
const sns = new AWS.SNS();

/**
 ESTRUCTURA DE PARAMETROS PARA ENVIO A SNS
 @params = {
    subject: " ",               // Sujeto del mensaje
    body: { },                  // Cuerpo del mensaje
    snsARN: " "                 // ARN de la SNS
 }

 ESTRUCTURA DE ATRIBUTOS PARA FILTRO DE SUSCRIPCIÓN
 @attributes = {
    variable_de_filtrado: {
        DataType: "Number",         // Tipo de dato: "Number", "String", etc.
        StringValue: `${value}`,    // Valor asociado
    },
 };
*/

// ENVIO A SNS
const publishToSNS = async (params, attributes = {}) => {
  // PARAMETROS DE ENVIO PARA SNS
  const groupID = new Date().getTime();
  const dupGroupID = Math.floor(Math.random() * groupID);
  const subject = params.subject
    ? params.subject
    : `sns-message-${groupID}-${dupGroupID}`;

  const parameters = Object.freeze({
    Subject: subject,
    MessageGroupId: `${groupID}`,
    MessageDeduplicationId: `${dupGroupID}`,
    Message: JSON.stringify(params.body),
    MessageAttributes: attributes,
    TopicArn: `${params.snsARN}`,
  });

  try {
    const data = await sns.publish(parameters).promise();
    console.log(
      "Message published to SNS with data: " +
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

module.exports = publishToSNS;
