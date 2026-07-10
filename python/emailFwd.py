import boto3
import os
import json

ses = boto3.client('ses')
sender = os.environ.get('SENDER_EMAIL')
receiver = os.environ.get('RECEIVER_EMAIL')

def lambda_handler(event, context):
    try:
        if isinstance(event.get('body'), str):
            data = json.loads(event['body'])
        else:
            data = event
            
        name = data.get('name', 'Unknown')
        email = data.get('email', 'No Email')
        message = data.get('message', 'No Message')

        subject = f"Portfolio Message from {name}"

        ses.send_email(
            Source=sender,
            Destination={'ToAddresses': [receiver]},
            Message={
                'Subject': {'Data': subject},
                'Body': {
                    'Html': {
                        'Data': f"""
                        <h3>New Contact Form Submission</h3>
                        <p><strong>From:</strong> {name} ({email})</p>
                        <p><strong>Message:</strong></p>
                        <p style="background-color: #f4f4f4; padding: 10px; border-left: 4px solid #33D17A;">
                            {message}
                        </p>
                        <hr>
                        <small>Sent via your AWS Cloud Resume API</small>
                        """
                    }
                }
            }
        )

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