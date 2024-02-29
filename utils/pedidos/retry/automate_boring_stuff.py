import json
import time


def build_json():
    # orders file must have the next structure

    """ orders.md
    NUMORDEN1 IDCLIENTE1 FECHAEMISION1
    NUMORDEN2 IDCLIENTE2 FECHAEMISION2
    """

    # this structure is the easy way to build all the orders in the JSON

    orders_file = open('orders.md', 'r')

    list_order = orders_file.readlines()

    new_json = {"Records": []}

    for line in list_order:
        num_order, id_customer, order_date = line.split(' ')
        record = {
            "body": """{ \"Message\" : \"{\\\"CASA\\\":1,\\\"schema\\\":\\\"febeca\\\",\\\"data\\\":{""" +
                    """\\\"NUMORDEN\\\":\\\"""" + num_order +
                    """\\\",\\\"IDCLIENTE\\\":\\\"""" + id_customer.strip() +
                    """\\\",\\\"FECHAEMISION\\\":\\\"""" + order_date.strip() + """\\\"}}\"}"""
        }
        new_json["Records"].append(record)

    new_file = open(f'send_order_{int(time.time())}.json', 'w')

    new_file.write(json.dumps(new_json))

    print(f'total orders: {len(list_order)}')


if __name__ == '__main__':
    build_json()