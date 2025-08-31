#!/bin/sh

# Replace placeholder with runtime value
echo "window._env_ = { REACT_APP_ENV: \"$REACT_APP_ENV\" };" > /usr/share/nginx/html/env-config.js

exec nginx -g "daemon off;"
