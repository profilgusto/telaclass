FROM node:alpine3.20

ENV DEBIAN_FRONTEND=noninteractive

WORKDIR /app

COPY ./react-app/package.json /app/package.json
RUN npm install

# TODO Decidir se a compilação e copia do codigo sera aqui ou no docker-compose.
COPY ./react-app .

RUN npm run build

# EXPOSE 3000

# CMD ["npm", "start"]