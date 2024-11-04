## Setup
1. First clone this repository to your computer
2. Second run npm install or npm i

## Development server

to run in localhost
1. npm run dev


# About this project
this project using API from MMOBOMB, API stored in .env then accessed in server/middleware/api due to no cors configuration from the API so i need to create my own middleware with express and cors in term using it in single page application (SPA).

fetched data stored in stores/index using Pinia so the data can be accessed from different component without refetching, this method also perform better then refetching when opening another page. also since there is no database to store new added data, using global state is the best option

This is my first project using Nuxt 3, so this project is not perfect there is a lot of space for improvement# MCM_FE
