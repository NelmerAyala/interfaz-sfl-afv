SELECT
    C.IDCLIENTE AS CLIENTE,
    CONCAT(
        'RET',
        SUBSTRING(LP.USERNAME, 2),
        SUBSTRING(Z.NOMBREZONA, 2),
        DATE_FORMAT(RE.FECHACREACION, '%y%m%d'),
        RE.IDRETENCION
    ) AS DOCUMENTO,
    'Retenciones Ventas ' AS APLICACION,
    RE.FECHAEMISION AS FECHA_DOCUMENTO,
    RE.IDMONEDA AS MONEDA,
    CASE
        WHEN RE.MONTORETENCION = 0 THEN RE.MONTORETENCION_D
        ELSE RE.MONTORETENCION
    END AS MONTO,
    CASE
        WHEN RE.MONTORETENCION = 0 THEN RE.MONTORETENCION_D
        ELSE RE.MONTORETENCION
    END AS MONTO_DOLAR,
    CASE
        WHEN RE.MONTORETENCION_D = 0 THEN RE.MONTORETENCION_D
        ELSE RE.MONTORETENCION_D
    END AS MONTO_LOCAL,
    'VEN' AS PAIS,
    DC.SUBTIPO AS SUBTIPO,
    DC.TIPO AS TIPO,
    RE.IDCOLABORADOR AS VENDEDOR,
    RE.NUMEROCOMPROBANTE AS U_Comprobante
FROM
    retencion RE
    INNER join cliente C ON RE.IDEMISOR = C.IDCLIENTE
    INNER join documentocomercial DC ON RE.IDDOCUMENTO = DC.IDDOCUMENTO
    INNER JOIN zonas Z ON RE.IDZONA = Z.IDZONAS
--    INNER JOIN colaboradores CB ON RE.IDCOLABORADOR = CB.IDCOLABORADORES
 --   INNER JOIN monedas M ON RE.IDMONEDA = M.IDMONEDA
    INNER JOIN LoginColaborador LP ON LP.USERNAME = RE.USUARIOCREACION
WHERE
    RE.IDRETENCION = $ { IDRETENCION }
    AND RE.IDZONA = $ { IDZONA }
    AND RE.USUARIOCREACION = "${USUARIOCREACION}"