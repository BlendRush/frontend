variable "region" {
  default = "us-east-1"
}
variable "ami" {
  default = "ami-0c7217cdde317cfec" # Ubuntu 20.04 LTS in us-east-1
}
variable "instance_type" {
  default = "t2.micro"
}
