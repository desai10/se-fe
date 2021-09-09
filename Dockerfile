FROM node:12-alpine AS builder

WORKDIR /usr/app

COPY package*.json yarn.lock ./

RUN yarn install

COPY . .
RUN yarn build

# The final produced image starts here
FROM node:12-alpine

WORKDIR /usr/app
RUN npm install -g serve
RUN chown -R node:node .
COPY --from=builder --chown=node:node /usr/app/package*.json ./
COPY --from=builder --chown=node:node /usr/app/node_modules ./node_modules
COPY --from=builder --chown=node:node /usr/app/build ./build

ENV API_BASE=http://10.176.5.170:3000/ WS_BASE=ws://10.176.5.170:3000/cable

EXPOSE 3000
USER node
CMD [ "serve", "-s", "/usr/src/app/build", "-p", "3000" ]
