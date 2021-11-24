FROM node:12-alpine

LABEL author="Paulo Luan <pauloluan.inova@gmail.com>"
LABEL mantainer="Andre Carvalho <andre.carvalho@inpe.br>"

WORKDIR /app

COPY ./*.json /app/
COPY ./index.js /app/
COPY src/ /app/src/
ENV NPM_CONFIG_LOGLEVEL warn
RUN npm install -g yarn --force \
&& yarn install --production \
&& npm install pm2 -g \
&& pm2 install pm2-server-monit \
&& pm2 install pm2-logrotate

# add curl for use in swarm health test
RUN apk --no-cache add curl

ENV PORT 9000
EXPOSE 9000
ENV FILES_PATH /data/files
VOLUME ["${FILES_PATH}","/logs"]

CMD ["pm2-runtime", "--env", "production", "start", "pm2.json"]
