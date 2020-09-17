#!/bin/bash

# Update packages
sudo apt-get update -y
sudo apt-get upgrade -y

# Install dependencies
sudo apt install curl -y
sudo apt install jq -y

# Install Ansible
sudo apt update -y
sudo apt install software-properties-common -y
sudo apt-add-repository --yes --update ppa:ansible/ansible -y
sudo apt install ansible -y

# Install Azure CLI
curl -sL https://aka.ms/InstallAzureCLIDeb | sudo bash

# Copy custom Ansible configuration file
sudo cp ./ESEIMS-ansible/ansible.cfg /etc/ansible/ansible.cfg
