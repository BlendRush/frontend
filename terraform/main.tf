provider "aws" {
  region = "us-east-1"
}

variable "region" {
  default = "us-east-1"
}

variable "ami" {
  # Ubuntu Server 22.04 LTS - us-east-1
  default = "ami-053b0d53c279acc90"
}

variable "instance_type" {
  default = "t2.micro"
}

resource "aws_key_pair" "blendrush_frontend_key" {
  key_name   = "blendrush_frontend_key"
  public_key = file("${path.module}/blendrush_frontend_key.pub")
}

resource "aws_security_group" "frontend_sg" {
  name        = "frontend_sg"
  description = "Allow SSH and HTTP"

  ingress {
    description = "SSH"
    from_port   = 22
    to_port     = 22
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  ingress {
    description = "HTTP"
    from_port   = 80
    to_port     = 80
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }
}

resource "aws_instance" "frontend_instance" {
  ami                         = var.ami
  instance_type               = var.instance_type
  key_name                    = aws_key_pair.blendrush_frontend_key.key_name
  associate_public_ip_address = true
  vpc_security_group_ids      = [aws_security_group.frontend_sg.id]

  tags = {
    Name = "FrontendAppInstance"
  }

  provisioner "remote-exec" {
    inline = [
      "sudo apt update -y",
      "sudo apt install docker.io -y",
      "sudo systemctl start docker",
      "sudo systemctl enable docker"
    ]

    connection {
      type        = "ssh"
      user        = "ubuntu"
      private_key = file("${path.module}/blendrush_frontend_key")
      host        = self.public_ip
    }
  }
}

output "frontend_public_ip" {
  value = aws_instance.frontend_instance.public_ip
}
