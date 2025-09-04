FROM node:20-alpine AS build

# Set working directory
WORKDIR /app

# Copy all files
COPY . .

# Install dependencies
RUN npm install

# Increase memory limit and build the app
RUN NODE_OPTIONS="--max-old-space-size=4096" npm run build

# Use Nginx to serve the built app
FROM nginx:alpine

# Copy the build output to Nginx public directory
COPY --from=build /app/build /usr/share/nginx/html

# Expose port 80
EXPOSE 80

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]
