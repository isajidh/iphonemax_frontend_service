FROM node:lts-alpine AS build
ENV NODE_ENV=production
WORKDIR /usr/src/app
COPY ["package.json", "./"]
RUN npm config set legacy-peer-deps=true
RUN npm install mdb-react-ui-kit@4.2.0
RUN npm install
COPY . .
RUN npm run build

# STAGE 2
FROM nginx:1.16-alpine
COPY --from=build /usr/src/app/build /usr/share/nginx/html
USER root
CMD ["nginx", "-g", "daemon off;"]
EXPOSE 80

LABEL org.opencontainers.image.source="https://github.com/isajidh/iphonemax_frontend_service"