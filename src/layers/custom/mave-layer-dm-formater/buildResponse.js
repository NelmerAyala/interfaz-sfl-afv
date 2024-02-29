const axio = require("axios");
const graphql = require("graphql");
const { print } = graphql;

const buidlResponse = async (event, queryPayload, query) => {
  let response = {};
  let OkResponse = 200;

  if (event.action === "add") {
    OkResponse = 201;
  } else if (event.action === "inactivate") {
    OkResponse = 204;
  }

  try {
    const graphqlData = await axio({
      url: queryPayload.URL,
      method: "post",
      headers: {
        "x-api-key": queryPayload.API_KEY,
      },
      data: {
        query: print(query(event)),
      },
    });

    if (!graphqlData.data?.errors) {
      response = {
        statusCode: OkResponse,
        body: graphqlData.data.data,
        headers: {
          "Access-Control-Allow-Origin": "*",
        },
      };
    } else if (!graphqlData.data.errors[0].errorType) {
      response = {
        statusCode: 422,
        body: "Unprocessable Entity",
      };
    } else if (graphqlData.data.errors[0].errorType === "400 Bad Request") {
      response = {
        statusCode: 400,
        body: graphqlData.data.errors[0],
        headers: {
          "Access-Control-Allow-Origin": "*",
        },
      };
    } else if (graphqlData.data.errors[0].errorType === "MappingTemplate") {
      response = {
        statusCode: 404,
        body: "404 not found",
        headers: {
          "Access-Control-Allow-Origin": "*",
        },
      };
    }
  } catch (err) {
    if (err.response) {
      if (err.response.status == 401) {
        response = {
          statusCode: 401,
          body: "Unauthorized",
        };
      }
    }

    response = {
      statusCode: 500,
      ...err,
    };
  }

  return response;
};

module.exports = buidlResponse;
