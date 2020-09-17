#!/bin/bash

# Generar ssh key que se anadira a las maquinas virtuales
ssh-keygen -t rsa -N "" -f ~/.ssh/eseimskey

# Login azure
#read -sp "Azure password: " AZ_PASS && echo && az login -u email_azure -p $AZ_PASS
az login

# variables
rgName='ESEIMS-RG'
rgLocation='westeurope'

# ssh key path
ssh_path='~/.ssh/eseimskey.pub'

# ubuntu server variables
serverSize='Standard_D2_v3'
serverImage='UbuntuLTS' # az vm image list --location westus --publisher Canonical --offer UbuntuServer --sku 18.04-LTS --all --output table
serverName='ubuntu-server'
serverUser='ubuntu'
serverPorts=(22 3000 3001 3306 8086)

# ubuntu vm variables
uvmSize='Standard_D1_V2'
uvmImage='UbuntuLTS'
uvmName='ubuntu-vm'
uvmUser='ubuntu'
uvmPorts=(22)

# ubuntu vm 2 variables
uvm2Size='Standard_D1_V2'
uvm2Image='UbuntuLTS'
uvm2Name='ubuntu-vm2'
uvm2User='ubuntu2'
uvm2Ports=(22)

#echo "---- Creando grupo de recursos ----"
#az group create --name $rgName --location $rgLocation

##### Ubuntu Server #####

echo "---- Creando ${serverName} ----"

ip_server=$(az vm create --name ${serverName} --resource-group ${rgName} --image "${serverImage}" --size ${serverSize} --nsg "${serverName}-NSG" --ssh-key-values ${ssh_path} --public-ip-address-allocation static | jq -r '.publicIpAddress')

az network nsg rule create -g $rgName --nsg-name "${serverName}-NSG" -n "ICMP" --priority 350 --source-address-prefixes '*' --source-port-ranges '*' --destination-address-prefixes '*' --destination-port-ranges '*' --access 'Allow' --protocol 'ICMP'

echo "Red configurada!"

# Abrir puertos para el servidor
# 22: ssh, 443: SSL, 3000: nodejs, 3001: grafana, 3306: MySQL, 8086: influxDB

priority=1000

for port in "${serverPorts[@]}"
do
	echo "Abriendo puerto: ${port}"
	((priority=priority+10))
	az vm open-port --port $port --priority $priority --resource-group $rgName --name $serverName
done

echo "Puertos configurados!"

# Se actualiza el usuario de despliegue con la clave ssh pública
az vm user update --resource-group $rgName -n $serverName -u $serverUser --ssh-key-value "$(< ~/.ssh/eseimskey.pub)"

echo "Maquina Virtual creada!"


##### Ubuntu VM #####
echo "---- Creando ${uvmName} ----"

ip_uvm=$(az vm create --name ${uvmName} --resource-group ${rgName} --image "${uvmImage}" --size ${uvmSize} --nsg "${uvmName}-NSG" --ssh-key-values ${ssh_path} --public-ip-address-allocation static | jq -r '.publicIpAddress')

# Configuracion reglas de red
az network nsg rule create -g $rgName --nsg-name "${uvmName}-NSG" -n "ICMP" --priority 350 --source-address-prefixes '*' --source-port-ranges '*' --destination-address-prefixes '*' --destination-port-ranges '*' --access 'Allow' --protocol 'ICMP'

echo "Red configurada!"

priority=1000

for port in "${uvmPorts[@]}"
do
    echo "Abriendo puerto: ${port}"
	((priority=priority+10))
    az vm open-port --port $port --priority $priority --resource-group $rgName --name $uvmName
done

echo "Puertos configurados!"

# Se actualiza el usuario de despliegue con la clave ssh pública
az vm user update --resource-group $rgName -n $uvmName -u $uvmUser --ssh-key-value "$(< ~/.ssh/eseimskey.pub)"

echo "Maquina Virtual creada!"


##### UbuntuVM 2 ####

echo "---- Creando ${uvm2Name} ----"

ip_uvm2=$(az vm create --name ${uvm2Name} --resource-group ${rgName} --image "${uvm2Image}" --size ${uvm2Size} --nsg "${uvm2Name}-NSG" --ssh-key-values ${ssh_path} --public-ip-address-allocation static | jq -r '.publicIpAddress')

# Configuracion reglas de red
az network nsg rule create -g $rgName --nsg-name "${uvm2Name}-NSG" -n "ICMP" --priority 350 --source-address-prefixes '*' --source-port-ranges '*' --destination-address-prefixes '*' --destination-port-ranges '*' --access 'Allow' --protocol 'ICMP'

echo "Red configurada!"

priority=1000

for port in "${uvm2Ports[@]}"
do
    echo "Abriendo puerto: ${port}"
      ((priority=priority+10))
    az vm open-port --port $port --priority $priority --resource-group $rgName --name $uvm2Name
done

echo "Puertos configurados!"

# Se actualiza el usuario de despliegue con la clave ssh pública
az vm user update --resource-group $rgName -n $uvm2Name -u $uvm2User --ssh-key-value "$(< ~/.ssh/eseimskey.pub)"

echo "Maquina Virtual creada!"



##### Aprovisionamiento con Ansible #####

# Se sobreescribe el fichero de hosts
echo -e "[server-infra]\n${ip_server}\n\n[laboratory-SO5]\n${ip_uvm}\n\n[laboratory-SO6]\n${ip_uvm2}\n\n[server-infra:vars]\nlaboratory=infra\nserver=${ip_server}\n\n[laboratory-SO5:vars]\nlaboratory=SO5\nserver=${ip_server}\n\n[laboratory-SO6:vars]\nlaboratory=SO6\nserver=${ip_server}" >> /tmp/ansible_hosts
sudo mv /tmp/ansible_hosts /etc/ansible/hosts

echo "---- Aprovisionamiento ----"

# comando para ejecutar el playbook de Ansible
ansible-playbook ESEIMS-ansible/runansible.yml
