ARG NODE_VERSION=18
ARG AWS_CDK_VERSION=1.105.0

FROM node:${NODE_VERSION}

RUN apt-get install -y \
    python3 \
    ca-certificates \
    && update-ca-certificates \
    && npm install -g aws-cdk@${AWS_CDK_VERSION}