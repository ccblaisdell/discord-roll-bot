# Probably this variable is initialized from the CLI when running `plan`
variable "do_token" {}

provider "digitalocean" {
  token = var.do_token
}

# Create a new Web Droplet in the nyc1 region
resource "digitalocean_droplet" "web" {
  image  = "ubuntu-18-04-x64"
  name   = "web-1"
  region = "nyc1"
  size   = "s-1vcpu-1gb"

  provisioner "file" {
    source      = "../.env"
    destination = "/home/ccblaisdell/discord-roll-bot/.env"
  }

  user_data = templatefile("./cloud_init.tpl", {})
}

output "instance_ip_addr" {
  value = digitalocean_droplet.web.ipv4_address
}
