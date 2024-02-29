// LISTA DE MICROSERVICIOS
const ms_list = {
  articulos: 1,
  bancosCuentas: 2,
  clientes: 3,
  colaboradores: 4,
  condicionPago: 5,
  divComercial: 6,
  divGeografica: 7,
  docComerciales: 8,
  empaque: 9, // NO EXISTE
  impuestos: 10,
  monedas: 11,
  tasaCambio: 12,
  fletes: 13,
  promociones: 14,
  default_state: 0,
};

// DEFINIMOS ID DEL MICROSERVICIO, SEGUN EL PATH DE LA API.
const getMicroservice = (path) => {
  if (path.includes("articulos")) return ms_list.articulos; // 1
  else if (path.includes("bancosCuentas")) return ms_list.bancosCuentas; // 2
  else if (path.includes("clientes")) return ms_list.clientes; // 3
  else if (path.includes("colaboradores")) return ms_list.colaboradores; // 4
  else if (path.includes("condicionPago")) return ms_list.condicionPago; // 5
  else if (path.includes("divComercial")) return ms_list.divComercial; // 6
  else if (path.includes("divGeografica")) return ms_list.divGeografica; // 7
  else if (path.includes("docComerciales")) return ms_list.docComerciales; // 8
  else if (path.includes("empaque")) return ms_list.empaque; // 9
  else if (path.includes("impuestos")) return ms_list.impuestos; // 10
  else if (path.includes("monedas")) return ms_list.monedas; // 11
  else if (path.includes("tasaCambio")) return ms_list.tasaCambio; // 12
  else if (path.includes("fletes")) return ms_list.fletes; // 13
  else if (path.includes("promociones")) return ms_list.promociones; // 14
  else return ms_list.default_state; // 0
};

// SE DEFINE LA ENTIDAD DE LA URI PARA EL MICROSERVICIO.
const getEntity = (path) => {
  let pathList = path.split("/"); // Separación de la URI
  return pathList.at(-1) != "" ? pathList.at(-1) : pathList.at(-2);
};

module.exports = { getMicroservice, getEntity };
