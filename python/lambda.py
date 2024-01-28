import json
import boto3

dynamodb = boto3.resource('dynamodb')
table = dynamodb.Table('ip_petrov')

def lambda_handler(event, context):
    response = table.scan()
    items = response.get('Items', [])

    if len(items) > 0:
        item = items[0]
        views = item.get('views', 0)
        views += 1

        print(f'Views: {views}')

        response = table.put_item(Item={
            'id': '0',
            'views': views
        })

        return views
    else:
        # If no items found, initialize with 1 view
        response = table.put_item(Item={
            'id': '0',
            'views': 1
        })

        return 1
