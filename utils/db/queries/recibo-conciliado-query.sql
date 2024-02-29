 SELECT
        R.IDRECEPTORRECIBO AS CLIENTE,
        CONCAT(
            'R',
            SUBSTRING(LP.USERNAME, 2),
            SUBSTRING(Z.NOMBREZONA, 2),
            DATE_FORMAT(R.FECHACREACION, '%y%m%d'),
            R.IDRECIBO
        ) AS DOCUMENTO,
        CU.IDENTIDADFINANCIERA AS ENTIDAD_FINANCIERA,
        CONCAT(
            DATE_FORMAT(R.FECHACREACION, '%Y-%m-%dT%T'),
            '.000'
        ) AS U_Fecha_Recibo,
        CU.IDTIPOCUENTABANCARIA AS MONEDA,
        CASE
            WHEN RP.IDMONEDA = 205 THEN TRUNCATE(RP.MONTO_OTRAS, 2)
            WHEN RP.IDMONEDA = 100 THEN TRUNCATE(RP.MONTO, 2)
        END AS MONTO,
        TRUNCATE(RP.MONTO, 2) AS MONTO_DOLAR,
        TRUNCATE(RP.MONTO_OTRAS, 2) AS MONTO_LOCAL,
        R.OBSERVACIONES AS NOTAS,
        IP.SUBTIPO AS SUBTIPO,
        IP.TIPO AS TIPO,
        R.IDCOLABORADOR AS VENDEDOR,
        CASE
            WHEN IP.IDINSTRUMENTOPAGO = 21 THEN NULL
            ELSE RP.NUMERODOCUMENTO1
        END AS UDF_PAGO,
        CONCAT(RP.FECHADOCUMENTO, 'T00:00:00.000') AS FECHA_DOCUMENTO,
        CAST(
            CONCAT(
                '[',
                GROUP_CONCAT(
                    DISTINCT JSON_OBJECT(
                        "DEBITO",
                        CASE
                            WHEN MV.USUARIOUA = 'MASIVO_SALDO' THEN CONCAT('A', MV.NROMOVFISCAL)
                            ELSE MV.NROMOVFISCAL
                        END,
                        "CREDITO",
                        CONCAT(
                            'R',
                            SUBSTRING(LP.USERNAME, 2),
                            SUBSTRING(Z.NOMBREZONA, 2),
                            DATE_FORMAT (RD.FECHACREACION, '%y%m%d'),
                            RD.IDRECIBO
                        ),
                        "MONTO_DOLAR",
                        RD.MONTOCOBRADO,
                        "MONTO_LOCAL",
                        CASE
                            WHEN RP.IDMONEDA = 100 THEN RD.MONTOCOBRADO_D_ORIG
                            ELSE RD.MONTOCOBRADO_D
                        END,
                        "TIPO_DEBITO",
                        D.TIPO,
                        "TIPO_CREDITO",
                        IP.TIPO,
                        "SUBTIPO_DEBITO",
                        D.SUBTIPO,
                        "SUBTIPO_CREDITO",
                        IP.SUBTIPO,
                        "MONTO_BONIFICACION",
                        RD.MONTOBONIFICACION
                    )
                ),
                ']'
            ) AS JSON
        ) AS reciboDetalle
    FROM recibo R
        INNER JOIN recibopago RP ON (
            R.IDRECIBO = RP.IDRECIBO
            AND R.IDZONA = RP.IDZONA
            AND R.USUARIOCREACION = RP.USUARIOCREACION
        )
        INNER JOIN recibodetalle RD ON (
            RD.IDRECIBO = RP.IDRECIBO
            AND RD.IDZONA = RP.IDZONA
            AND RD.USUARIOCREACION = RP.USUARIOCREACION
        )
        INNER JOIN movcomercial MV ON RD.IDMOVCOMERCIAL = MV.IDMOVCOMERCIAL
        INNER JOIN documentocomercial D ON MV.IDDOCUMENTO = D.IDDOCUMENTO
--         INNER JOIN monedas M ON RP.IDMONEDA = M.IDMONEDA
    --    INNER JOIN cliente C ON R.IDRECEPTORRECIBO = C.IDCLIENTE
        INNER JOIN zonas Z ON R.IDZONA = Z.IDZONAS
      --   INNER JOIN colaboradores CB ON R.IDCOLABORADOR = CB.IDCOLABORADORES
        INNER JOIN instrumentopago IP ON RP.IDINSTRUMENTOPAGO = IP.IDINSTRUMENTOPAGO
        INNER JOIN logincolaborador LP ON R.USUARIOCREACION = LP.USERNAME
        INNER JOIN cuentabancariainterna CU
    WHERE RP.IDCONSECUTIVO = 0
     /**    AND R.USUARIOCREACION = ?
         AND R.IDZONA = ?
        AND R.IDRECIBO = ?
        AND CU.IDCUENTABANCARIA = ? */
    GROUP BY R.IDRECIBO,
        R.IDZONA,
        R.USUARIOCREACION;