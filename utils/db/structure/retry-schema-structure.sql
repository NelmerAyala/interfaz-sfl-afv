CREATE DATABASE audpeticion_epr;
CREATE TABLE audpeticion_epr.audpeticion_erp (DOCUMENTO varchar(256) NOT NULL, ENTIDAD int NOT NULL, CASA int NOT NULL, FECHACREACION datetime DEFAULT CURRENT_TIMESTAMP, FECHASOLICITUD datetime, MENSAJE_ERROR text, ERRORCODE text, TIMESTAMP_SFL varchar(256), JSON_REQUEST text, JSON_SEND text, PRIMARY KEY (DOCUMENTO, ENTIDAD, CASA)) ENGINE=InnoDB DEFAULT CHARSET=latin1 DEFAULT COLLATE=latin1_swedish_ci;

