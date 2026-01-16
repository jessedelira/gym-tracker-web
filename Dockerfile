# Build stage
FROM node:20-alpine AS build

WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build


# Production stage
FROM caddy:2-alpine

# Copy built files
COPY --from=build /app/dist /usr/share/caddy

# Copy Caddy config
COPY Caddyfile /etc/caddy/Caddyfile

EXPOSE 80
EXPOSE 443
