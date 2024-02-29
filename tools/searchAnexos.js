// const logs = require("./logs.json");
const logs = require("./logs-insights-anexos.json");
const anexos = require("./anexos.json");
const fs = require("fs");

let logData = [];
let temp = [];
let response = [];

// Devuelve los logs coincidentes
anexos.forEach((anexo) => {
  let temp = logs.filter((log) => JSON.stringify(log["@message"]).includes(anexo));
  if (temp.length == 0) console.log(`${anexo} not found`)
  logData.push(...temp);
});

//console.log(logData);

// Devuelve lista de logs por request Ids anteriores
logData.forEach((data) => {
  temp.push(
    ...logs.filter((logItem) => logItem["@requestId"] == data["@requestId"])
  );

  let i = temp.findIndex((itemito) => itemito == data);

  response.push({
    message: temp[i]["@message"],
    response: temp[i + 1]["@message"],
  });
});

console.log(`Se encontraron ${response.length} coincidencias!`);

const jsonData = JSON.stringify(response);
fs.writeFile("anexos-monitor.json", jsonData, (err) => {
  if (err) throw err;
  console.log("El archivo ha sido creado!");
});
