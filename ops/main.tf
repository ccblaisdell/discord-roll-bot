# Probably this variable is initialized from the CLI when running `plan`
variable "do_token" {}
variable "discord_api_token" {}

provider "digitalocean" {
  token = var.do_token
}

# Create a new Web Droplet in the nyc1 region
resource "digitalocean_droplet" "web" {
  image  = "ubuntu-latest"
  name   = "web-1"
  region = "nyc1"
  size   = "s-1vcpu-1gb"
  user_data = templatefile("./cloud_init.tpl", { discord_api_token: var.discord_api_token })
}

output "instance_ip_addr" {
  value = digitalocean_droplet.web.ipv4_address
}
