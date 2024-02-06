# Project name

<h1 align="center">
  <img src="./public/pictures/readme.png" alt="PulpCinemaHub" style="max-width: 400px; width: 100%;" />
</h1>
<br/>
<div align="center">
  <img src="https://img.shields.io/badge/📖%20license-%20MIT-a964d0.svg" alt="48 items"/> 
  <img id="last-update-badge" src="https://img.shields.io/badge/%F0%9F%93%85%20Last%20update%20-%20February%2005%2C%202024-d94c30.svg" alt="Last update: February 06, 2024" /> 
  <img src="https://img.shields.io/badge/ %E2%9C%94%20Updated%20For%20Version%20-%20Node%2020.10.0-e1e521.svg" alt="Updated for Node 20.10.0"/>
</div>

## Welcome!

This project is mvp of forum fullstack and SSR app. App was created using tailwind, node.js, MongoDB, Javascript, css.

### Prerequisites

- Node.js (v20.10.0 or later)
- MongoDB account and database
- NPM or Yarn installed

# 1. How to launch this project

**[✔] 1.1 Create new `/images` folder in `/public` folder**

**[✔] 1.2 Add `.env` file**

- Create a new file named `.env` in the project root directory.

- To do it propertly copy this code and paste it to your newly created .env file.

- Field SESSIONS_SECRET is meant for sessions security, just thnink of any password and put it there.

### `.env`

```
DB_USER=
DB_PASSWORD=
DB_HOST=
DB_NAME=
SESSIONS_SECRET=

MONGO_CONNECTION=mongodb+srv://__DB_USER:__DB_PASSWORD@__DB_HOST/__DB_NAME
```

**[✔] 1.3 Install dependencies**

- Run `npm install` in the root directory to install the required packages.

**[✔] 1.4 Launch the project**

- Use `node .`, `node app.js`, or `nodemon` (if installed) to start the project.

## Todo

As this project is on going there is a lot more left that needs to be worked on, so this is not a resource for production ready workflow ideas or systems.

Some of the things left to do:
 * Comments on posts
 * Delete profile
 * Create Help section...

## Additional Information

- **Supporting**: Contributions and suggestions are welcome!
- **License**: This project is licensed under the MIT License - see the [LICENSE](LICENSE.txt) file for details. Intention is that you can use everything in this project as a starting point or as a bits and pieces in your own project.


Hope you find this project interesting and useful!


<img src="./public/pictures/forum-home.png" alt="48 items" width="700" />
