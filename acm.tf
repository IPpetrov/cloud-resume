resource "aws_acm_certificate" "ssl_certificate" {
  provider                  = aws.us-east-1
  domain_name               = var.www_domain_name
  subject_alternative_names = ["*.${var.root_domain_name}", "${var.root_domain_name}"]
  validation_method         = "EMAIL"


  lifecycle {
    create_before_destroy = true
  }
}

resource "aws_acm_certificate_validation" "cert_validation" {
  provider        = aws.us-east-1
  certificate_arn = aws_acm_certificate.ssl_certificate.arn
}
