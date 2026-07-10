variable "region" {
  type        = string
  default     = "eu-central-1"
}

variable "root_domain_name" {
  type        = string
  description = "The root domain name"
}

variable "www_domain_name" {
  type        = string
  description = "The www domain name"
}

variable "SENDER_EMAIL" {
  type        = string
}

variable "RECEIVER_EMAIL" {
  type        = string
}