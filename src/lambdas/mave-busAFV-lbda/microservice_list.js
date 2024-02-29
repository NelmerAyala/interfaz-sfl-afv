// LISTA DE MICROSERVICIOS
const ms_list = {
    anexos: 21,
    pedido: 22,
    recibo: 23,
    retencion: 24,
    default_state: 0
};

// DEFINIMOS ID DEL MICROSERVICIO, SEGUN EL PATH DE LA API.
const getMicroservice = (entity) => {
    
    if (entity == "anexo")             return ms_list.anexos;          // 21
    else if (entity == "orden_lote")    return ms_list.pedido;          // 22
    else if (entity == "recibo")        return ms_list.recibo;          // 23
    else if (entity == "retencion")     return ms_list.retencion;       // 24
    else                                return ms_list.default_state;   // 0
    
};

module.exports = getMicroservice;
