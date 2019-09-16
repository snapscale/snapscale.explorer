# step 0
# compile
FROM node:10
COPY html /html
WORKDIR /html
RUN rm -rf /html/node_modules
RUN rm -rf /html/node_output
RUN rm -rf /html/package-lock.json
RUN npm install
RUN npm update acorn --depth 20
RUN npm dedupe
RUN npm run build

# step 1
# server
FROM nginx:1.15
LABEL Author="Miguel Cao(miguel.cao@xeniro.io)"
COPY --from=0 /html/output /html
COPY nginx/nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

# Copy the EntryPoint
COPY ./entryPoint.sh /
RUN chmod +x entryPoint.sh

ENTRYPOINT ["/entryPoint.sh"]
CMD ["nginx", "-g", "daemon off;"]