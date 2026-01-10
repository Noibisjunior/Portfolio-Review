FROM node:18-alpine AS build
WORKDIR /app
COPY package*.json ./
# Legacy peer deps handles the MUI/React version conflict
RUN npm install --legacy-peer-deps
COPY . .
RUN npm run build

FROM nginx:alpine
# COPY the build artifacts
COPY --from=build /app/build /usr/share/nginx/html

# CRITICAL CHANGE: We copy our config to conf.d/default.conf
# This leaves the main Nginx system config intact, preventing crashes.
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Cloud Run requires 8080
EXPOSE 8080

# Use default entrypoint
CMD ["nginx", "-g", "daemon off;"]