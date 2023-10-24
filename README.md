![pet_prooject](https://github.com/Stoyan83/pet-project/assets/95132005/5ad5a21c-315d-4e6e-b13a-c62b996065f8)

## Table of contents
* [General info](#general-info)
* [Technologies](#technologies)
* [Setup](#setup)

## General info
This project is simple Rails as backend and Vue.js as frontend project with basic CRUD operations. Using Devise gem and Jwt for auth. Rails runing at http://localhost:3000/  and Vue at http://localhost:8080/

## Technologies
* Ruby version: 3.1.2
* Rails version: 7.0.4
* Vue.js 3.0
* PostgreSQL
* HTML
* CSS
* Github actions
* Rspec

## Setup
To run this project, install it locally:

```
$ cd ../pet-project
$ bundle
$ rails db:create db:migrade db:seed
$ rails s
$ cd ../frontend
$ npm install
$ npm run serve
```
