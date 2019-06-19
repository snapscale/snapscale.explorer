# step 0
# compile
FROM node:10
COPY html /html

# step 1
# server
FROM nginx:1.15
LABEL Author="Miguel Cao(miguel.cao@xeniro.io)"
COPY --from=0 /html/output /html
COPY nginx/nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80