import boto3
import os
import json

ses = boto3.client('ses')
sender = os.environ['SENDER_EMAIL']
receiver = os.environ['RECEIVER_EMAIL']

def lambda_handler(event, context):
    try:
        if 'body' in event:
            data = json.loads(event['body'])
        else:
            data = event
            
        name = data.get('name', 'No Name')
        email = data.get('email', 'No Email')
        message = data.get('message', 'No Message')
        
    except Exception as e:
        print(f"Error parsing JSON: {str(e)}")
        return create_response(400, "Invalid JSON input")

    try:
        ses.send_email(
            Source=sender,
            Destination={'ToAddresses': [receiver]},
            Message={
                'Subject': {
                    'Data': f"Resume Contact: {name} ({email})",
                    'Charset': 'utf-8'
                },
                'Body': {
                    'Text': {
                        'Data': f"From: {name}\nEmail: {email}\n\nMessage:\n{message}",
                        'Charset': 'utf-8'
                    }
                }
            }
        )
        return create_response(200, "Email sent!")
        
    except Exception as e:
        print(f"SES Error: {str(e)}")
        return create_response(500, "Failed to send email")

def create_response(status_code, message):
    """Helper to return proper CORS headers to the browser"""
    return {
        'statusCode': status_code,
        'headers': {
            'Access-Control-Allow-Origin': 'www.ip-petrov.com',
            'Access-Control-Allow-Headers': 'Content-Type',
            'Access-Control-Allow-Methods': 'OPTIONS,POST'
        },
        'body': json.dumps(message)
    }