provider "aws" {
  region = "us-east-1"
}

variable "region" {
  default = "us-east-1"
}

variable "ami" {
  default = "ami-053b0d53c279acc90" # Ubuntu 22.04 LTS
}

variable "instance_type" {
  default = "t2.micro"
}

# 🔐 SSH Key Pair
resource "aws_key_pair" "blendrush_f_key" {
  key_name   = "blendrush_f_key"
  public_key = file("${path.module}/blendrush_f_key.pub")
}

# 🌐 VPC
resource "aws_vpc" "main_vpc" {
  cidr_block = "10.0.0.0/16"
}

# 📡 Internet Gateway
resource "aws_internet_gateway" "igw" {
  vpc_id = aws_vpc.main_vpc.id
}

# 🛣 Route Table
resource "aws_route_table" "public_rt" {
  vpc_id = aws_vpc.main_vpc.id

  route {
    cidr_block = "0.0.0.0/0"
    gateway_id = aws_internet_gateway.igw.id
  }
}

# 🌐 Public Subnet
resource "aws_subnet" "public_subnet" {
  vpc_id                  = aws_vpc.main_vpc.id
  cidr_block              = "10.0.1.0/24"
  map_public_ip_on_launch = true
}

# 🔗 Associate Subnet to Route Table
resource "aws_route_table_association" "public_assoc" {
  subnet_id      = aws_subnet.public_subnet.id
  route_table_id = aws_route_table.public_rt.id
}

# 🔒 Security Group
resource "aws_security_group" "frontend_sg" {
  name        = "frontend_sg"
  description = "Allow SSH and HTTP"
  vpc_id      = aws_vpc.main_vpc.id

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

# 💻 EC2 Instance
resource "aws_instance" "frontend_instance" {
  ami                         = var.ami
  instance_type               = var.instance_type
  key_name                    = aws_key_pair.blendrush_f_key.key_name
  subnet_id                   = aws_subnet.public_subnet.id
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
      private_key = file("${path.module}/blendrush_f_key")
      host        = self.public_ip
    }
  }
}

# 🔎 Output the public IP
output "frontend_public_ip" {
  value = aws_instance.frontend_instance.public_ip
}
