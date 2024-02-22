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

#REST API for emailfwd lambda
resource "aws_api_gateway_rest_api" "example" {
  name        = "emailFwd_API"
  description = "Forward emails from website contact form"
}

resource "aws_api_gateway_resource" "proxy" {
  rest_api_id = "${aws_api_gateway_rest_api.example.id}"
  parent_id   = "${aws_api_gateway_rest_api.example.root_resource_id}"
  path_part   = "fwEmail"
}

resource "aws_api_gateway_method" "proxy" {
  rest_api_id   = "${aws_api_gateway_rest_api.example.id}"
  resource_id   = "${aws_api_gateway_resource.proxy.id}"
  http_method   = "POST"
  authorization = "NONE"
}

resource "aws_api_gateway_integration" "lambda" {
  rest_api_id = "${aws_api_gateway_rest_api.example.id}"
  resource_id = "${aws_api_gateway_method.proxy.resource_id}"
  http_method = "${aws_api_gateway_method.proxy.http_method}"

  integration_http_method = "POST"
  type                    = "AWS_PROXY"
  uri                     = "${aws_lambda_function.emailFwd_function.invoke_arn}"
}

resource "aws_api_gateway_deployment" "example" {
  rest_api_id = "${aws_api_gateway_rest_api.example.id}"
  stage_name  = "prod"
}

resource "aws_lambda_permission" "apigw" {
  statement_id  = "AllowAPIGatewayInvoke"
  action        = "lambda:InvokeFunction"
  function_name = "${aws_lambda_function.emailFwd_function.function_name}"
  principal     = "apigateway.amazonaws.com"

  # The /*/* portion grants access from any method on any resource
  # within the API Gateway "REST API".
  source_arn = "${aws_api_gateway_rest_api.example.execution_arn}/*/*"
}