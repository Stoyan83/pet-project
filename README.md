![pet_prooject](https://github.com/Stoyan83/pet-project/assets/95132005/5ad5a21c-315d-4e6e-b13a-c62b996065f8)

## Table of contents
* [General info](#general-info)
* [Technologies](#technologies)
* [Setup](#setup)

## General info
This project is a web application that utilizes Ruby on Rails for its backend and Vue.js for its frontend. It offers standard CRUD operations and employs the Devise gem for user authentication, while JWT ensures secure authorization. The Rails backend runs on http://localhost:3000, while Vue.js operates on http://localhost:8080. A noteworthy feature is the integration of the "vue-draggable" library, allowing users to interact with elements through drag-and-drop actions, enhancing the user experience and interactivity.

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
