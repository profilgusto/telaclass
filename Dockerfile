# Usar a imagem base do Ubuntu 20.04
FROM node:latest

# Set the DEBIAN_FRONTEND environment variable to noninteractive
ENV DEBIAN_FRONTEND=noninteractive

# update nos pacotes do sistema
RUN apt-get update -yq && apt-get upgrade -yq 

# apagando a lista de pacotes
RUN rm -rf /var/lib/apt/lists/*

# definindo o work directory
WORKDIR /app
