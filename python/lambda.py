import json
import boto3
import logging
from botocore.exceptions import ClientError

logger = logging.getLogger()
logger.setLevel(logging.INFO)

dynamodb = boto3.resource('dynamodb')
table = dynamodb.Table('ip_petrov')

COUNTER_ITEM_ID = 'total_unique_views'

def lambda_handler(event, context):
    source_ip = None
    try:
        source_ip = event['requestContext']['http']['sourceIp']

        if not source_ip:
             raise ValueError("Source IP could not be determined from the event.")

        logger.info(f"Received request from IP: {source_ip}")

    except (KeyError, TypeError, ValueError) as e:
        logger.error(f"Could not extract source IP from event: {e}")
        logger.error(f"Event structure (first 500 chars): {json.dumps(event)[:500]}")
        return get_current_count()

    is_new_visitor = False
    try:
        table.put_item(
            Item={
                'id': source_ip 
            },
            ConditionExpression='attribute_not_exists(id)' 
        )
        is_new_visitor = True
        logger.info(f"New unique visitor detected: {source_ip}")

    except ClientError as e:
        if e.response['Error']['Code'] == 'ConditionalCheckFailedException':
            logger.info(f"Returning visitor detected: {source_ip}")
            pass 
        else:
            logger.error(f"DynamoDB error checking/putting IP item: {e}")
            return get_current_count()

    if is_new_visitor:
        try:
            logger.info(f"Incrementing unique visitor count ({COUNTER_ITEM_ID}).")
            response = table.update_item(
                Key={'id': COUNTER_ITEM_ID}, 

                UpdateExpression='SET #v = if_not_exists(#v, :start) + :inc',

                ExpressionAttributeNames={
                    '#v': 'views'  
                },

                ExpressionAttributeValues={
                    ':inc': 1,
                    ':start': 0 
                },
                ReturnValues='UPDATED_NEW' 
            )
        except ClientError as e:
            logger.error(f"DynamoDB error incrementing counter ({COUNTER_ITEM_ID}): {e}")
            pass

    return get_current_count()


def get_current_count():
    try:
        response = table.get_item(Key={'id': COUNTER_ITEM_ID})
        item = response.get('Item', {})
        views = item.get('views', 0)
        logger.info(f"Current unique visitor count from {COUNTER_ITEM_ID}: {views}")
        return int(views) 
    except ClientError as e:
        logger.error(f"DynamoDB error getting current count ({COUNTER_ITEM_ID}): {e}")
        return 0 