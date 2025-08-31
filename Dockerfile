FROM node:18 AS build
WORKDIR /app

COPY package*.json ./
RUN npm install
COPY . .

# build React app
RUN npm run build

FROM nginx:alpine

# default to prod, but override at runtime
ENV REACT_APP_ENV=PROD

# Copy built React app
COPY --from=build /app/build /usr/share/nginx/html

# Add custom nginx config
COPY nginx.conf /etc/nginx/conf.d/default.conf

# entrypoint for env replacement
RUN apk add --no-cache bash
COPY entrypoint.sh /entrypoint.sh
RUN chmod +x /entrypoint.sh

EXPOSE 80
ENTRYPOINT ["/entrypoint.sh"]
