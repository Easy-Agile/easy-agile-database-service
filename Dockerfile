FROM node:12

# node may come with an older version of npm. Ensure we have a specific npm.
RUN npm install -g npm@6.14.14

################################################################################
# Install prerequisites
RUN apt-get update
RUN apt-get install -y \
    lsb-release \
    curl

RUN mkdir -p /app
WORKDIR /app

COPY package.json package-lock.json /app/

RUN yarn install

COPY . /app/

RUN yarn build

CMD "yarn start:prod"