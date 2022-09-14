FROM node:lts-alpine

WORKDIR /usr/app

COPY package.json yarn.* ./

RUN yarn install --frozen-lockfile --production=false

COPY . .

EXPOSE 3333

CMD [ "yarn", "start:dev" ]
