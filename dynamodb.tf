#Create DynamoDB
resource "aws_dynamodb_table" "ip_petrov" {
  name           = "ip_petrov"
  billing_mode   = "PAY_PER_REQUEST"
  hash_key       = "id"

  attribute {
    name = "id"
    type = "S" 
  }
  
  attribute {
    name = "views"
    type = "N" 
  }

  global_secondary_index {
    name               = "views-index"
    hash_key           = "views"
    range_key          = "id"
    projection_type    = "ALL"
  }
}