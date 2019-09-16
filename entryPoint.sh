#!/bin/bash
set -xe
: "${API_URL?Need an api url}"
: "${WS_URL?Need an ws url}"

sed -i "s/PLACEHOLDER_API_URL/$API_URL/g" /etc/nginx/conf.d/default.conf

sed -i "s/PLACEHOLDER_WS_URL/$WS_URL/g" /etc/nginx/conf.d/default.conf

exec "$@"