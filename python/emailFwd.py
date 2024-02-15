import boto3
import os

ses = boto3.client('ses')
sender = os.environ['SENDER_EMAIL']
receiver = os.environ['RECEIVER_EMAIL']

def lambda_handler(event, context):
    response = ses.send_email(
    Source = sender,
        Destination = {
            'ToAddresses': [receiver,]
        },
        Message={
            'Subject': {
                'Data': 'Email From: ' + event['email'],
                'Charset': 'utf-8'
            },
            'Body': {
                'Text': {
                    'Data': event['message'],
                    'Charset': 'utf-8'
                },
                'Html': {
                'Data': event['message'],
                    'Charset': 'utf-8'
            }
            }
        }
    )
    return 'Email sent!'