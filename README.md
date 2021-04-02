# Fastech-API

## Table of contents

- [General info](#general-info)
- [Technologies](#technologies)
- [Setup](#setup)
- [Testing](#Test)

## General info

This project is simple Restful API that serves json replies.

### API-Endpoints

/user/login
/user/support
/user/details
/admin/login
/admin/tickets

## Technologies

Project is created with:

- Node.js
- Express.js
- MongoDB
- Mocha
- Chai

## Setup

To run this project, install it locally using npm: Please make sure to add environmental variables in .env file

DB=DB URL
PORT=3000
SECRET=mysecretkey

```
$ cd /Fastech-API
$ touch or mkdir .env
$ npm install
$ npm start
```

## Test

To Test the API endpoints run the below command

```
$ npm test
```
