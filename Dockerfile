FROM alpine:3.7
LABEL maintainer="s.herzberg"

ENV NODE_VERSION 8.9.3

RUN addgroup -g 1000 node \
    && adduser -u 1000 -G node -s /bin/sh -D node \
    && apk add --no-cache --virtual .build-deps \
        binutils-gold \
        curl \
        g++ \
        gcc \
        gnupg \
        libgcc \
        linux-headers \
        make \
        python \
    && apk add --no-cache nodejs

COPY ./ /application

WORKDIR /application
RUN npm install \
    && apk del .build-deps

EXPOSE 8080
CMD [ "npm", "start" ]

