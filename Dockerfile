FROM node:lts-alpine
ENV NODE_ENV=production
WORKDIR /usr/src/app
COPY ["package.json", "./"]
RUN npm config set legacy-peer-deps=true
RUN npm config set registry=https://registry.npmjs.org
RUN npm install --omit=dev && mv node_modules ../
COPY . .
EXPOSE 3000
USER root
CMD ["npm", "start"]
