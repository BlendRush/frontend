output "frontend_public_ip" {
  value = aws_instance.frontend_ec2.public_ip
}
