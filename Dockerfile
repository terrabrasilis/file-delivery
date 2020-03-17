FROM node:12-alpine

LABEL mantainer="Paulo Luan <pauloluan.inova@gmail.com>"

WORKDIR /app

COPY package.json .
ENV NPM_CONFIG_LOGLEVEL warn
RUN npm install -g yarn --force
RUN yarn install --production

COPY . .

# Install app dependencies
RUN npm install pm2 -g
RUN pm2 install pm2-server-monit
RUN pm2 install pm2-logrotate

ENV PORT 9000
EXPOSE 9000
ENV FILES_PATH /data/files
VOLUME ["${FILES_PATH}","/logs"]

# Show current folder structure in logs
RUN ls -al -R

CMD ["pm2-runtime", "--env", "production", "start", "pm2.json"]
