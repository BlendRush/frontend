output "blendrush_fd_public_ip" {
  value = aws_instance.frontend_instance.public_ip
}
