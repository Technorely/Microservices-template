FROM node:10.15.3

RUN wget -O /usr/local/bin/dumb-init https://github.com/Yelp/dumb-init/releases/download/v1.2.2/dumb-init_1.2.2_amd64
RUN chmod +x /usr/local/bin/dumb-init

RUN mkdir /app
WORKDIR /app

COPY ./package*.json .

RUN yarn

COPY . .

ENTRYPOINT ["/usr/local/bin/dumb-init", "--"]
CMD ["npm", "run", "start"]
