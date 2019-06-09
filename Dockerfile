FROM node:10

WORKDIR /explorer
ADD . /explorer

RUN npm install && npm run build

# run on nginx
FROM nginx:1.15

LABEL Author="Michael Huang(michael.huang@xeniro.io)"

ARG BUILD_VERSION=1.0.0
ARG BUILD_DATE

LABEL org.label-schema.docker.cmd="docker run -p 80:80 -d asia.gcr.io/snapscale/explorer:latest"
LABEL org.label-schema.build-date=$BUILD_DATE
LABEL org.label-schema.version=$BUILD_VERSION

ENV BUILD_VERSION=$BUILD_VERSION
ENV BUILD_DATE=$BUILD_DATE

COPY --from=0 /explorer/dist /usr/share/nginx/html

EXPOSE 80

