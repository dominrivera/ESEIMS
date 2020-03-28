#!/bin/bash

# Generate ssh key for locally to add into azure virtual machines
ssh-keygen -t rsa -N "" -f ~/.ssh/eseimskey

# Login azure
read -sp "Azure password: " AZ_PASS && echo && az login -u eseims@outlook.es -p $AZ_PASS

# common variables
rgName='ESEIMS-RG'
rgLocation='westeurope'

# ubuntu server variables
serverSize='Standard_D2_v3'
serverImage='UbuntuLTS' # az vm image list --location westus --publisher Canonical --offer UbuntuServer --sku 18.04-LTS --all --output table
serverName='ubuntu-server'
serverUser='ubuntu'
serverPorts=(22 443 3000 3001 3306 8086)

# ubuntu vm variables
uvmSize='Standard_D1_V2'
uvmImage='UbuntuLTS'
uvmName='ubuntu-vm'
uvmUser='ubuntu'
uvmPorts=(22 443)

# ubuntu vm 2 variables
uvm2Size='Standard_D1_V2'
uvm2Image='UbuntuLTS'
uvm2Name='ubuntu-vm2'
uvm2User='ubuntu2'
uvm2Ports=(22 443)

# windows vm variables
wvmSize='Standard_D1_V2'
wvmImage='MicrosoftWindowsDesktop:Windows-10:rs5-pro:17763.1039.2002091844' #az vm image list --publisher MicrosoftWindowsDesktop --offer Windows-10 --all --output table
wvmName='windows-vm'
wvmUser='windows'
wvmPassword='Admin12345678!'
wvmPorts=(443 5986)

# Se crea un grupo de recursos.
#az group create --name $rgName --location $rgLocation

##### Ubuntu Server #####

# Se crea una máquina virtual con UbuntuLTS 16.04.3 y se generan las claves ssh.
# Además se extrae la IP pública de la máquina y se guarda en la variable $ip_server.
#echo "---- Creating ${serverName} ----"

#ip_server=$(az vm create --name ${serverName} --resource-group ${rgName} --image "${serverImage}" --size ${serverSize} --nsg "${serverName}-NSG" --generate-ssh-keys --public-ip-address-allocation static | jq -r '.publicIpAddress')

#echo "Virtual machine created!"

# Create network rules
#az network nsg rule create -g $rgName --nsg-name "${serverName}-NSG" -n "ICMP" --priority 350 --source-address-prefixes '*' --source-port-ranges '*' --destination-address-prefixes '*' --destination-port-ranges '*' --access 'Allow' --protocol 'ICMP'

# Abrir puertos para el servidor
# 22: ssh, 443: SSL, 3000: nodejs, 3001: grafana, 3306: MySQL, 8086: influxDB

#priority=1000

#for port in "${serverPorts[@]}"
#do
#	echo "Opening port: ${port}"
#	((priority=priority+10))
#	az vm open-port --port $port --priority $priority --resource-group $rgName --name $serverName
#done

#echo "Ports configured!"

# Se actualiza el usuario de despliegue con la clave ssh pública
#az vm user update --resource-group $rgName -n $serverName -u $serverUser --ssh-key-value "$(< ~/.ssh/eseimskey.pub)"


echo "You can now connect using 'ssh ${serverName}@${ip_server}'"


##### Ubuntu VM #####
echo "---- Creating ${uvmName} ----"

#ip_uvm=$(az vm create --name ${uvmName} --resource-group ${rgName} --image "${uvmImage}" --size ${uvmSize} --nsg "${uvmName}-NSG" --generate-ssh-keys --public-ip-address-allocation static | jq -r '.publicIpAddress')

echo "Virtual machine created!"

# Configure network rule
#az network nsg rule create -g $rgName --nsg-name "${uvmName}-NSG" -n "ICMP" --priority 350 --source-address-prefixes '*' --source-port-ranges '*' --destination-address-prefixes '*' --destination-port-ranges '*' --access 'Allow' --protocol 'ICMP'

#echo "Network configured!"

#priority=1000

#for port in "${uvmPorts[@]}"
#do
#    echo "Opening port: ${port}"
#	((priority=priority+10))
#    az vm open-port --port $port --priority $priority --resource-group $rgName --name $uvmName
#done

#echo "Ports configured!"

# Se actualiza el usuario de despliegue con la clave ssh pública
#az vm user update --resource-group $rgName -n $uvmName -u $uvmUser --ssh-key-value "$(< ~/.ssh/eseimskey.pub)"

echo "You can now connect using 'ssh ${uvmName}@${ip_uvm}'"

##### UbuntuVM 2 ####

echo "---- Creating ${uvm2Name} ----"

ip_uvm2=$(az vm create --name ${uvm2Name} --resource-group ${rgName} --image "${uvm2Image}" --size ${uvm2Size} --nsg "${uvm2Name}-NSG" --generate-ssh-keys --public-ip-address-allocation static | jq -r '.publicIpAddress')

echo "Virtual machine created!"

# Configure network rule
az network nsg rule create -g $rgName --nsg-name "${uvm2Name}-NSG" -n "ICMP" --priority 350 --source-address-prefixes '*' --source-port-ranges '*' --destination-address-prefixes '*' --destination-port-ranges '*' --access 'Allow' --protocol 'ICMP'

echo "Network configured!"

priority=1000

for port in "${uvm2Ports[@]}"
do
    echo "Opening port: ${port}"
      ((priority=priority+10))
    az vm open-port --port $port --priority $priority --resource-group $rgName --name $uvm2Name
done

echo "Ports configured!"

# Se actualiza el usuario de despliegue con la clave ssh pública
az vm user update --resource-group $rgName -n $uvm2Name -u $uvm2User --ssh-key-value "$(< ~/.ssh/eseimskey.pub)"

echo "You can now connect using 'ssh ${uvm2Name}@${ip_uvm2}'"

##### Windows VM #####
#echo "---- Creating ${wvmName} ----"

#ip_wvm=$(az vm create --name ${wvmName} --resource-group ${rgName} --admin-username ${wvmUser} --admin-password ${wvmPassword} --image "${wvmImage}" --size ${wvmSize} --nsg "${wvmName}-NSG" --public-ip-address-allocation 'static' | jq -r '.publicIpAddress')

#echo "Virtual machine created!"

# Configure network rule
#az network nsg rule create -g $rgName --nsg-name "${wvmName}-NSG" -n "ICMP" --priority 350 --source-address-prefixes '*' --source-port-ranges '*' --destination-address-prefixes '*' --destination-port-ranges '*' --access 'Allow' --protocol 'ICMP'

#echo "Network configured!"

#priority=1000

#for port in "${wvmPorts[@]}"
#do
#	echo "Opening port: ${port}"
#	((priority=priority+10))
#	az vm open-port --port $port --priority $priority --resource-group $rgName --name $wvmName
#done

#echo "Ports configured!"

# Se actualiza el usuario de despliegue con la clave ssh pública
#az vm user update --resource-group $rgName -n $wvmName -u $wvmUser --ssh-key-value "$(< ~/.ssh/id_ecdsa.pub)"

##### Ansible provisioning #####

#echo "---- Provisioning virtual machines ----"

#echo -e "[${serverName}]\n${ip_server}\n\n[${uvmName}]\n${ip_uvm}\n\n[${wvmName}]\n${ip_wvm}\n\n[${serverName}:vars]\nansible_user=${serverUser}\n\n[${uvmName}:vars]\nansible_user=${uvmUser}\n\n[${wvmName}:vars]\nansible_user=${wvmUser}\nansible_password=${wvmPassword}\nansible_connection=winrm\nansible_winrm_server_cert_validation=ignore" >> hosts_test

# ansible-playbook runansible.yml -vv
