import boto3
import os
import json

ses = boto3.client('ses')
sender = os.environ.get('SENDER_EMAIL')
receiver = os.environ.get('RECEIVER_EMAIL')

def lambda_handler(event, context):
    print(f"DEBUG - SENDER_ENV: {sender}")
    print(f"DEBUG - RECEIVER_ENV: {receiver}")
    print(f"DEBUG - RAW_EVENT: {json.dumps(event)}")
    
    try:
        if isinstance(event.get('body'), str):
            data = json.loads(event['body'])
        else:
            data = event
            
        name = data.get('name', 'Unknown')
        email = data.get('email', 'No Email')
        message = data.get('message', 'No Message')

        print(f"DEBUG - Parsed Data: Name={name}, Email={email}")

        ses.send_email(
            Source=sender,
            Destination={'ToAddresses': [receiver]},
            Message={
                'Subject': {'Data': f"Contact: {name}"},
                'Body': {
                    'Text': {'Data': f"From: {name} ({email})\n\n{message}"},
                    'Html': {'Data': f"<h3>New Message</h3><p><strong>From:</strong> {name}</p><p>{message}</p>"}
                }
            }
        )
        print("DEBUG - SES Send Call Finished Successfully")

        return {
            'statusCode': 200,
            'headers': {'Access-Control-Allow-Origin': '*'},
            'body': json.dumps("Email sent!")
        }

    except Exception as e:
        print(f"FATAL ERROR: {str(e)}")
        return {
            'statusCode': 500,
            'headers': {'Access-Control-Allow-Origin': '*'},
            'body': json.dumps(str(e))
        }