# Build stage
FROM node:24-alpine AS build

WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .

ARG VITE_API_URL=https://api.gym-tracker.app
ENV VITE_API_URL=$VITE_API_URL

RUN npm run build


# Production stage
FROM caddy:2-alpine

# Copy built files
COPY --from=build /app/dist /usr/share/caddy

# Copy Caddy config
COPY Caddyfile /etc/caddy/Caddyfile

EXPOSE 8080
