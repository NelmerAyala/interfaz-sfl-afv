SELECT
    A.IDARTICULO AS ARTICULO,
    OD.CANTIDADPEDIDA AS CANTIDAD_PEDIDA,
    CASE
        WHEN (
            ODL.VALORDSCTO IS NOT NULL
            AND ODP.PORCENTAJE IS NOT NULL
        ) THEN CONCAT(
            'DESC PROMO: ',
            ODP.PORCENTAJE,
            '% DESC POR EMP: ',
            ODL.VALORDSCTO,
            '%'
        )
        WHEN (
            ODL.VALORDSCTO IS NOT NULL
            AND ODP.PORCENTAJE IS NULL
        ) THEN CONCAT(
            'DESC EMP: ',
            ODL.VALORDSCTO,
            '% DESC POR PROMO: 0%'
        )
        WHEN (
            ODL.VALORDSCTO IS NULL
            AND ODP.PORCENTAJE IS NOT NULL
        ) THEN CONCAT(
            'DESC EMP: 0%',
            ' DESC POR PROMO: ',
            ODP.PORCENTAJE,
            '%'
        )
        ELSE 'DESC PROMO: 0% DESC POR EMP: 0%'
    END AS COMENTARIO,
    CASE
        WHEN O.STATUSORDEN = 3 THEN 'N'
        WHEN O.STATUSORDEN = 4 THEN 'A'
    END AS ESTADO,
    CONCAT(
        'P',
        SUBSTRING(LC.USERNAME, 2),
        SUBSTRING(Z.CODIGOZONA, 2),
        SUBSTRING(DATE_FORMAT(O.FECHAEMISION, '%Y%m%d'), 3),
        O.NUMORDEN
    ) AS PEDIDO,
    CASE
        WHEN (
            ODL.VALORDSCTO IS NOT NULL
            AND ODP.PORCENTAJE IS NOT NULL
        ) THEN (
            ODL.VALORDSCTO + ODP.PORCENTAJE - (ODL.VALORDSCTO * ODP.PORCENTAJE / 100)
        )
        WHEN (
            ODL.VALORDSCTO IS NOT NULL
            AND ODP.PORCENTAJE IS NULL
        ) THEN (ODL.VALORDSCTO)
        WHEN (
            ODL.VALORDSCTO IS NULL
            AND ODP.PORCENTAJE IS NOT NULL
        ) THEN (ODP.PORCENTAJE)
        ELSE 0
    END AS PORC_DESCUENTO,
    OD.PRECIOUNITARIO AS PRECIO_UNITARIO,
    'P' AS TIPO_DESCUENTO
FROM
    ordendetalle_lote OD
    INNER JOIN articulos A ON OD.IDARTICULO = A.IDARTICULO
    LEFT JOIN ordendscto_lote ODL ON (
        OD.NUMORDEN = ODL.NUMORDEN
        AND OD.FECHAEMISION = ODL.FECHAEMISION
        AND OD.IDCLIENTE = ODL.IDCLIENTE
        AND OD.IDARTICULO = ODL.IDARTICULO
        AND OD.ID_LOTE_ARTICULO = ODL.ID_LOTE_ARTICULO
    )
    LEFT JOIN ordendetallepromocion_lote ODP ON (
        OD.NUMORDEN = ODP.NUMORDEN
        AND OD.FECHAEMISION = ODP.FECHAEMISION
        AND OD.IDCLIENTE = ODP.IDCLIENTE
        AND ODP.STATUS = 2
        AND ODP.IDPROMOCION > 0
        AND (
            (
                A.IDMARCA = ODP.IDMARCA
                AND OD.IDARTICULO = ODP.IDARTICULO
                AND OD.ID_LOTE_ARTICULO = ODP.ID_LOTE_ARTICULO
            )
            OR(
                ODP.TIPOPROMOCION = 4
                AND A.IDMARCA = ODP.IDMARCA
                AND OD.IDARTICULO <> ODP.IDARTICULO
                AND OD.ID_LOTE_ARTICULO <> ODP.ID_LOTE_ARTICULO
            )
            OR (
                A.IDMARCA <> ODP.IDMARCA
                AND OD.IDARTICULO = ODP.IDARTICULO
                AND OD.ID_LOTE_ARTICULO = ODP.ID_LOTE_ARTICULO
            )
            OR (
                A.IDMARCA = ODP.IDMARCA
                AND OD.IDARTICULO = ODP.IDARTICULO
                AND OD.ID_LOTE_ARTICULO <> ODP.ID_LOTE_ARTICULO
            )
        )
    )
    INNER JOIN orden_lote O ON (
        OD.IDCLIENTE = O.IDCLIENTE
        AND OD.NUMORDEN = O.NUMORDEN
        AND OD.FECHAEMISION = O.FECHAEMISION
    )
    INNER JOIN logincolaborador LC ON LC.IDCOLABORADORES = O.IDCOLABORADORES
    INNER JOIN zonas Z ON O.IDZONAS = Z.IDZONAS
WHERE
    O.NUMORDEN = ${ NUMORDEN }
    AND O.IDCLIENTE = ${ IDCLIENTE }
    AND O.FECHAEMISION = ${ FECHAEMISION }
    AND (
        SELECT
            VALCAD
        FROM
            PARAMAPP P
        WHERE
            P.CODPAR = 'FLETECOD'
    ) <> A.CODVIEJO;