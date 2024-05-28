# Powerflex API

The main purpose of this repository is to show a good end-to-end project setup and workflow for writing a Postgres, Node.js Express code in TypeScript complete with middleware, models, routes, and types.

This example comes with a complete REST API to handle Authentication and CRUD features on Users and their corresponding Profile.

# Why TypeScript?

While it's true that developing applications on an Untyped language such as **JavaScript**, is easier to learn and is faster to develop, it will undeniably get harder and harder to grasp as the application grows in scale. This in turn, leads to more run-time errors consuming more development hours, as the team gets accustomed to the growing codebase. And this is what this boilerplate hopes to achieve. By using the **TypeScript** standard, you'll have better team and code stability with **Interface Oriented Development**, leading to better standardized codes. TypeScript allows developers to focus more on exposed Interfaces or API, rather than having to know all the code by heart. This makes the codebase easier to maintain with big teams, especially if those teams are composed of developers of different skill levels.

# Prerequisites

To build and run this app locally you will need a few things:

- Install [Node.js](https://nodejs.org/en/)
- Install [VS Code](https://code.visualstudio.com/)
- Pull latest postgres docker image

# Getting started

- Clone the repository

```
git clone https://github.com/kranthi590/powerflex-api
```

- Install dependencies

```
cd powerflex-api
npm install
```

- Build and run the project with auto reload (nodemon)

```
npm run dev
```

- Build and run the project without docker (Make sure postgres docker instance running)

```
npm run build
npm run start
```

- Build and run the project using docker

```
docker compose up
```

Finally, navigate to `http://localhost:3000/` and you should see the API running!

# Testing


Please refer to API docs on URL: http://localhost:3000/api-docs/

I would recommend using swagger for testing, since no additional setup is required.