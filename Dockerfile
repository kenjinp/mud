FROM node:10

RUN yarn add parcel-bundler -g
WORKDIR /tmp
COPY package.json /tmp/
RUN yarn
WORKDIR /usr/src/app
COPY . /usr/src/app/
RUN cp -a /tmp/node_modules /usr/src/app/
RUN yarn build

EXPOSE 8080
EXPOSE 3000

CMD [ "/usr/local/bin/node", "dist/index.js" ]