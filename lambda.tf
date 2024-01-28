
#Create Lambda function
data "archive_file" "lambda" {
  type        = "zip"
  source_file = "python/lambda.py"
  output_path = "python/lambda.zip"
}

resource "aws_lambda_function" "lambda_function" {
  filename      = "python/lambda.zip"
  function_name = "lambda"
  role          = aws_iam_role.existing_lambda_exec.arn
  handler       = "lambda.lambda_handler"
  runtime = "python3.11"
  source_code_hash = data.archive_file.lambda.output_base64sha256
}

resource "aws_lambda_function_url" "lambda_function" {
  function_name      = aws_lambda_function.lambda_function.function_name
  authorization_type = "NONE"

  cors {
    allow_origins     = ["*"]
    allow_methods     = ["*"]
  }
}

resource "aws_lambda_permission" "lambda_dynamodb_permission" {
  statement_id  = "AllowExecutionFromLambda"
  action        = "lambda:InvokeFunction"
  function_name = aws_lambda_function.lambda_function.function_name
  principal     = "dynamodb.amazonaws.com"
  source_arn    = aws_dynamodb_table.ip_petrov.arn
}

resource "aws_iam_policy" "dynamodb_policy" {
  name        = "dynamodb_policy"
  description = "IAM policy for DynamoDB access"

  policy = jsonencode({
    Version = "2012-10-17",
    Statement = [
      {
        Action   = [
          "dynamodb:GetItem",
          "dynamodb:PutItem",
          "dynamodb:UpdateItem",
          "dynamodb:Scan"
        ],
        Effect   = "Allow",
        Resource = aws_dynamodb_table.ip_petrov.arn
      }
    ]
  })
}

resource "aws_iam_role_policy_attachment" "lambda_dynamodb_policy_attachment" {
  role       = aws_iam_role.existing_lambda_exec.name
  policy_arn = aws_iam_policy.dynamodb_policy.arn
}


