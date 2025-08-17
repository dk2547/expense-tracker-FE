FROM node:18 AS build
WORKDIR /app

COPY package*.json ./
RUN npm install
COPY . .

# build once (generic, no env baked in)
RUN npm run build

FROM nginx:alpine

# default to prod, but override at runtime
ENV REACT_APP_ENV=prod

COPY --from=build /app/build /usr/share/nginx/html

# Replace placeholder with runtime env variable
RUN apk add --no-cache bash
COPY entrypoint.sh /entrypoint.sh
RUN chmod +x /entrypoint.sh

EXPOSE 80
ENTRYPOINT ["/entrypoint.sh"]
