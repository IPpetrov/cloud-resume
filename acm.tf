resource "aws_acm_certificate" "ssl_certificate" {
  provider                  = aws.us-east-1
  domain_name               = var.www_domain_name
  subject_alternative_names = ["*.${var.root_domain_name}", "${var.root_domain_name}"]
  validation_method         = "DNS"
}

resource "cloudflare_record" "cert_validation" {
  for_each = {
    for dvo in aws_acm_certificate.ssl_certificate.domain_validation_options : dvo.resource_record_name => {
      name   = dvo.resource_record_name
      record = dvo.resource_record_value
      type   = dvo.resource_record_type
    }
  }

  zone_id         = var.cloudflare_zone_id
  name            = each.value.name
  content         = each.value.record
  type            = each.value.type
  proxied         = false
  allow_overwrite = true
}

resource "aws_acm_certificate_validation" "cert_validation" {
  provider                = aws.us-east-1
  certificate_arn         = aws_acm_certificate.ssl_certificate.arn
  validation_record_fqdns = [for record in cloudflare_record.cert_validation : record.hostname]
}