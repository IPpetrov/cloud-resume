import boto3
import os
import json

ses = boto3.client('ses')
sender = os.environ.get('SENDER_EMAIL')
receiver = os.environ.get('RECEIVER_EMAIL')

def lambda_handler(event, context):
    print(f"EVENT: {json.dumps(event)}")
    
    try:
        if isinstance(event.get('body'), str):
            data = json.loads(event['body'])
        else:
            data = event
            
        name = data.get('name', 'Unknown')
        email = data.get('email', 'No Email')
        message = data.get('message', 'No Message')

        ses.send_email(
            Source=sender,
            Destination={'ToAddresses': [receiver]},
            Message={
                'Subject': {'Data': f"Resume Contact: {name}"},
                'Body': {'Text': {'Data': f"From: {name} ({email})\n\n{message}"}}
            }
        )

        return {
            'statusCode': 200,
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Headers': 'Content-Type'
            },
            'body': json.dumps("Email sent!")
        }

    except Exception as e:
        print(f"SES ERROR: {str(e)}")
        return {
            'statusCode': 500,
            'headers': {'Access-Control-Allow-Origin': '*'},
            'body': json.dumps(f"Error: {str(e)}")
        }