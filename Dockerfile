# Usar a imagem base do Ubuntu 20.04
FROM node:latest

# Set the DEBIAN_FRONTEND environment variable to noninteractive
ENV DEBIAN_FRONTEND=noninteractive

# update nos pacotes do sistema
RUN apt-get update -yq && apt-get upgrade -yq 

# Pacotes básicos de desenvolvimento
#RUN apt-get install -y \
#    nano \
#    tree \
#    iputils-ping \
#    curl \
#    gnupg \
#    unzip

# instalando o Node.js e json-server
# RUN curl -fsSL https://deb.nodesource.com/setup_lts.x | bash -
# RUN apt-get install -y nodejs
# RUN npm install -g json-server

# apagando a lista de pacotes
RUN rm -rf /var/lib/apt/lists/*

# definindo o work directory
WORKDIR /app
