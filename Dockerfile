FROM ubuntu:18.04

USER root

RUN apt update -y && apt install software-properties-common -y && apt-add-repository --yes --update ppa:ansible/ansible && apt install ansible -y

RUN mkdir /root/.ssh/

COPY ./eseimskey.pub /root/.ssh/eseimskey.pub
COPY ./eseimskey /root/.ssh/eseimskey
COPY ./ESEIMS-ansible/ESEIMS-provisioning/ /etc/ansible/ESEIMS-provisioning
COPY ./ESEIMS-ansible/hosts /etc/ansible/hosts
COPY ./ESEIMS-ansible/ansible.cfg /etc/ansible/ansible.cfg
COPY ./ESEIMS-ansible/runansible.yml /etc/ansible/runansible.yml

WORKDIR /etc/ansible

CMD exec /bin/bash -c "trap : TERM INT; sleep infinity & wait"
#CMD ["ansible-playbook", "runansible.yml", "-i", "hosts"]
