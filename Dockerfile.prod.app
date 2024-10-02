FROM node:alpine3.20

ENV DEBIAN_FRONTEND=noninteractive

WORKDIR /app

COPY ./react-app/package.json /app/package.json
RUN npm install

COPY ./react-app .

RUN npm run build

EXPOSE 3000

CMD ["npm", "start"]