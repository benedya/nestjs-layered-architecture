FROM node:18-slim

SHELL ["/bin/bash", "-c"]

RUN apt-get update && apt-get upgrade -y

RUN apt-get install procps -y
RUN npm i -g @nestjs/cli
RUN npm i -g serverless
RUN npm i -g npm-check-updates


WORKDIR /home/node/app

USER node

CMD [ -d "node_modules" ] && npm i && npm run start:dev
