FROM node:10-slim
ENV NODE_ENV=production
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app
COPY . /usr/src/app/
RUN npm install 
EXPOSE 8080  
CMD npm start