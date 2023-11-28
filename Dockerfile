# Use an official Node runtime as the base image
FROM node:16 AS build

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json to the container
COPY ./my-app/package*.json ./

# Install app dependencies in the container
RUN npm install

# Copy the rest of the application code into the container
COPY ./my-app .

# Set the environment variable
ARG REACT_APP_PORTFOLIO_APP_AUTHORIZATION_URL
ENV REACT_APP_PORTFOLIO_APP_AUTHORIZATION_URL=$REACT_APP_PORTFOLIO_APP_AUTHORIZATION_URL

# Build the React app
RUN npm run build

# Use Nginx to serve the build
FROM nginx:alpine

COPY --from=build /app/build /usr/share/nginx/html
EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]