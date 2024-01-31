# S3 bucket for backend / store state
terraform {
  backend "s3" {
    bucket         = "ip-petrov-tf-state"
    key            = "terraform.tfstate"
    region         = "eu-central-1"
    encrypt        = true
  }
}


# S3 bucket for www. website
resource "aws_s3_bucket" "my_bucket" {
  bucket = var.www_bucket_name
}

resource "aws_s3_bucket_ownership_controls" "my_bucket" {
  bucket = aws_s3_bucket.my_bucket.id
  rule {
    object_ownership = "BucketOwnerPreferred"
  }
}

resource "aws_s3_bucket_public_access_block" "my_bucket" {
  bucket = aws_s3_bucket.my_bucket.id

  block_public_acls       = false
  block_public_policy     = false
  ignore_public_acls      = false
  restrict_public_buckets = false
}

resource "aws_s3_bucket_acl" "my_bucket" {
  depends_on = [
    aws_s3_bucket_ownership_controls.my_bucket,
    aws_s3_bucket_public_access_block.my_bucket,
  ]

  bucket = aws_s3_bucket.my_bucket.id
  acl    = "public-read"
}

resource "aws_s3_object" "index_object" {
  bucket = aws_s3_bucket.my_bucket.id
  key    = "index.html"
  source = "website/index.html"

  etag = filemd5("website/index.html")
  content_type = "text/html"
  acl = "public-read"
}

resource "aws_s3_object" "error_object" {
  bucket = aws_s3_bucket.my_bucket.id
  key    = "error.html"
  source = "website/error.html"

  etag = filemd5("website/error.html")
  content_type = "text/html"
  acl = "public-read"
}

resource "aws_s3_object" "script_object" {
  bucket = aws_s3_bucket.my_bucket.id
  key    = "script.js"
  source = "website/script.js"

  etag = filemd5("website/script.js")
  content_type = "text/html"
  acl = "public-read"
}

resource "aws_s3_object" "styles_object" {
  bucket = aws_s3_bucket.my_bucket.id
  key    = "styles.css"
  source = "website/styles.css"

  etag = filemd5("website/styles.css")
  content_type = "text/html"
  acl = "public-read"
}

resource "aws_s3_bucket_website_configuration" "my_bucket" {
  bucket = aws_s3_bucket.my_bucket.id

  index_document {
    suffix = "index.html"
  }

  error_document {
    key = "error.html"
  }

  routing_rule {
    condition {
      key_prefix_equals = "website/"
    }
    redirect {
      replace_key_prefix_with = "/"
    }
  }
}

# S3 bucket for redirecting non-www to www.
resource "aws_s3_bucket" "root_bucket" {
  bucket = var.root_bucket_name
}

resource "aws_s3_bucket_website_configuration" "root_bucket" {
  bucket = aws_s3_bucket.root_bucket.id
  index_document {
    suffix = "index.html"
  }

  error_document {
    key = "error.html"
  }
    
  routing_rule {
    redirect {
      host_name = "${var.www_domain_name}"
      replace_key_with = ""
      protocol = "https"
    }
    
  }
}

