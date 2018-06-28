FROM node:10-slim
ENV NODE_ENV=development
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app
COPY . /usr/src/app/
EXPOSE 8080 28080
CMD npm run start-dev