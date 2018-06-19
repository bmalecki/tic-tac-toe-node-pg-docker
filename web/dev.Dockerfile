FROM node:10-slim
ENV NODE_ENV=development
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app
COPY . /usr/src/app/
EXPOSE 3000
CMD npm run start-dev