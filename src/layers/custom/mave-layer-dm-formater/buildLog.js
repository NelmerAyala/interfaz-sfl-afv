const buildLog = (response, queryData, source) => {
  let bodyLog = {
    time: new Date().toISOString(),
    source: source,
    detail: {
      data: response.body,
      CASA: queryData.schema,
    },
    "detail-type": "success",
  };

  if (response.statusCode >= 400) {
    bodyLog["detail-type"] = "error";

    bodyLog.detail.data = queryData.data;

    bodyLog.detail.error = response.body;
  }

  console.log(JSON.stringify(bodyLog));
};

module.exports = buildLog;
