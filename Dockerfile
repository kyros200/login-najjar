# stage: 1
FROM node:12

WORKDIR /app
ADD . /app
RUN yarn install --production
CMD ["node", "./app/bin/server.js"]