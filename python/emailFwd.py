import boto3
import os
import json

ses = boto3.client('ses')
sender = os.environ.get('SENDER_EMAIL')
receiver = os.environ.get('RECEIVER_EMAIL')

def lambda_handler(event, context):
    print(f"Received event: {json.dumps(event)}")
    
    try:
        if 'body' in event:
            body_data = json.loads(event['body'])
        else:
            body_data = event
            
        name = body_data.get('name', 'Unknown')
        email = body_data.get('email', 'No Email')
        message = body_data.get('message', 'No Message')

        ses.send_email(
            Source=sender,
            Destination={'ToAddresses': [receiver]},
            Message={
                'Subject': {'Data': f"Contact Form: {name}", 'Charset': 'utf-8'},
                'Body': {
                    'Text': {
                        'Data': f"From: {name} ({email})\n\nMessage:\n{message}",
                        'Charset': 'utf-8'
                    }
                }
            }
        )

        return {
            'statusCode': 200,
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Headers': 'Content-Type',
                'Access-Control-Allow-Methods': 'OPTIONS,POST'
            },
            'body': json.dumps("Email sent successfully!")
        }

    except Exception as e:
        print(f"ERROR: {str(e)}")
        return {
            'statusCode': 500,
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Content-Type': 'application/json'
            },
            'body': json.dumps({"error": str(e)})
        }