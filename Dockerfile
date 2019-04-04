FROM node:10

WORKDIR /root

# install NPM dependencies
COPY ./package.json /root/package.json
COPY ./package-lock.json /root/package-lock.json
RUN npm install

# copy client and server files over
COPY ./dist /root/dist
COPY ./server /root/server

# start the server
CMD ["node", "server/index"]