FROM node:10

RUN apt -y update && apt -y install curl

COPY . /app
COPY docker/bin/ergonode /usr/local/bin/ergonode
COPY docker/bin/healthcheck.sh /usr/local/bin/healthcheck.sh

RUN ["chmod", "-R", "+x", "/usr/local/bin"]

HEALTHCHECK CMD ["healthcheck.sh"]

EXPOSE 3000

WORKDIR /app

RUN chown -R node:node /app

USER node

RUN curl -o- -L https://yarnpkg.com/install.sh | bash

RUN yarn install

CMD ["ergonode"]
