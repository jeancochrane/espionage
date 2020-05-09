FROM buildkite/puppeteer

# Delete package.json inherited from base image
RUN rm /package*.json

COPY ./app/yarn.lock /yarn.lock
COPY ./app/package.json /package.json
RUN yarn install

COPY ./app /app
WORKDIR /app
