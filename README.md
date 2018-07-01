# Battleship-web-application

## 1. Introduction ##
This is a Docker Compose web application. It uses Node and Postegres.

## 2. Requirements ##
* [Docker 18.xx](https://docs.docker.com/engine/installation/) for start debugging and realeasing app.
    On Linux running machine I recommend to use this script [https://get.docker.com/](https://get.docker.com/) 

* [Docker Compose 1.2X](https://docs.docker.com/compose/install/)

## 3. How to develop ## 

1. Install node 10.4.1 locally (I recommend using [nvm](https://github.com/creationix/nvm))
2. Go to **web** folder and run
    
        npm install

3. Go to **client** folder and run
    
        npm install 
        npm run build

4. In root folder run 

        docker-compose up

### A. Client module ###

In order to hot reaload deployment run: 

    npm start 

Debug

    google-chrome --remote-debugging-port=9222

### B. pg module ###

Run psql 

    docker-compose exec --user postgres pg  psql -U node -d app -f /docker-entrypoint-initdb.d/init.sql


### C. Web module ###

To do
    

Folder structure:

    └── battleship-web-app      # Main project folder
        ├── client              # Frontend React App
        ├── pg                  # Postgres database
        └── web                 # Node backend


***

## 4. How to deploy production containers ##

Run *app-up.sh* script

