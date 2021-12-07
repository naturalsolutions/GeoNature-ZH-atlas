ARG BASE_IMAGE=node:14-alpine

FROM $BASE_IMAGE

ENV NODE_ENV=test
ENV NEXT_TELEMETRY_DISABLED=1

RUN apk add --no-cache bash git

WORKDIR /app

COPY ./package.json ./
COPY ./package-lock.json ./
RUN CI=true npm ci
COPY . ./