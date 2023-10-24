![pet_prooject](https://github.com/Stoyan83/pet-project/assets/95132005/5ad5a21c-315d-4e6e-b13a-c62b996065f8)

## Table of contents
* [General info](#general-info)
* [Technologies](#technologies)
* [Setup](#setup)

## General info
This project is a web application that combines Ruby on Rails for the backend and Vue.js for the frontend. It provides essential CRUD operations, user authentication through Devise and JWT, and a convenient drag-and-drop feature using the "vue-draggable" library. The application's backend runs on http://localhost:3000, while Vue.js operates on http://localhost:8080. Notably, the project also integrates GitHub Actions for continuous integration (CI), ensuring automated testing and deployment processes. 

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
