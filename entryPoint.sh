#!/bin/bash
set -xe
: "${PLACEHOLDER_API_URL?Need an api url}"
: "${PLACEHOLDER_WS_URL?Need an ws url}"

sed -i "s/PLACEHOLDER_API_URL/$PLACEHOLDER_API_URL/g" /etc/nginx/conf.d/default.conf

sed -i "s/PLACEHOLDER_WS_URL/$PLACEHOLDER_WS_URL/g" /etc/nginx/conf.d/default.conf

exec "$@"