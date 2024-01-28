#Create API
resource "aws_apigatewayv2_api" "my_api" {
  name          = "ip-petrov"
  protocol_type = "HTTP"
}

resource "aws_apigatewayv2_integration" "api_integration" {
  api_id            = aws_apigatewayv2_api.my_api.id
  integration_type  = "HTTP_PROXY"
  integration_uri   = aws_lambda_function_url.lambda_function.function_url
  integration_method = "ANY"  
}

resource "aws_apigatewayv2_route" "api_route" {
  api_id    = aws_apigatewayv2_api.my_api.id
  route_key = "GET /counter"  
  target    = "integrations/${aws_apigatewayv2_integration.api_integration.id}"
}

resource "aws_apigatewayv2_stage" "api_stage" {
  api_id    = aws_apigatewayv2_api.my_api.id
  name      = "prod"
  deployment_id = aws_apigatewayv2_deployment.api_deploy.id
}

resource "aws_apigatewayv2_deployment" "api_deploy" {
  api_id = aws_apigatewayv2_api.my_api.id
}