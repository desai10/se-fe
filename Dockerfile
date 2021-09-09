# FROM node:12-alpine AS builder
FROM node:12-alpine

WORKDIR /usr/app

COPY package*.json ./

RUN yarn install

COPY . .
ENV REACT_APP_API_BASE=http://143.244.128.12:3000/ REACT_APP_WS_BASE=ws://143.244.128.12:3000/cable
# RUN yarn build
CMD ["yarn", "start"]

# The final produced image starts here
# FROM node:12-alpine

# WORKDIR /usr/app
# RUN npm install -g serve
# RUN chown -R node:node .
# COPY --from=builder --chown=node:node /usr/app/package*.json ./
# COPY --from=builder --chown=node:node /usr/app/node_modules ./node_modules
# COPY --from=builder --chown=node:node /usr/app/build ./build

# ENV API_BASE=http://143.244.128.12:3000/ WS_BASE=ws://143.244.128.12:3000/cable

# EXPOSE 5000
# USER node
# CMD [ "serve", "-s", "/usr/src/app/build" ]
