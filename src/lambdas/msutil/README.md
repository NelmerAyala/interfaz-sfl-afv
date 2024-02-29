Should create a Role with following policy

`{
    "Version": "2012-10-17",
    "Statement": [
        {
            "Sid": "VisualEditor0",
            "Effect": "Allow",
            "Action": "lambda:UpdateEventSourceMapping",
            "Resource": "arn:aws:lambda:*:accountNumber:event-source-mapping:*"
        },
        {
            "Sid": "VisualEditor1",
            "Effect": "Allow",
            "Action": "lambda:ListEventSourceMappings",
            "Resource": "*"
        }
    ]
}`

Next, create the following environment variables
`LAMBDAS_NAME_1: msban msconpago mstcam msart msmon mscolab mspcat msimp msdocc msdcom mscli msdig msdgeo mspromo msfle
LAMBDAS_NAME_2: mave-msrec-lbda-buss-recibos mave-msanex-lbda-buss-anexos mave-msreten-lbda-dm-retenciones mave-msped-lbda-dm-pedido`

For last, the input object follow this pattern:
`{
  "active": true,
  "flowCode": 2
}`

Where
- active: boolean, action to activate or de-activate the triggers from lambda functions
- flowCode: integer, represent the group of lambda functions, separated by flow. 1 for SFL-AFV, 2 for AFV-SFL