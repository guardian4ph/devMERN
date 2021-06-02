FROM node:latest

RUN mkdir /app/src

WORKDIR /app/src
# coppy package.json to WORKDIR "."
COPY package.json .

RUN nmp install

COPY . .

EXPOSE 3000

CMD ["npm", "start"]
