# STAGE 2
FROM nginx:1.16-alpine
COPY ./build /usr/share/nginx/html
EXPOSE 80
# EXPOSE 3000 
# RUN chown -R node /usr/src/app
# USER node
USER root
CMD ["nginx", "-g", "daemon off;"]

LABEL org.opencontainers.image.source="https://github.com/isajidh/iphonemax_frontend_service"