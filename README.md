<h1 align="center">SkillSync</h1>

<p>
  <a href="https://github.com/hanzili/skillsync/graphs/contributors">
    <img src="https://img.shields.io/github/contributors/hanzili/skillsync" alt="contributors" />
  </a>
  <a href="">
    <img src="https://img.shields.io/github/last-commit/hanzili/skillsync" alt="last update" />
  </a>
  <a href="https://github.com/hanzili/skillsync/network/members">
    <img src="https://img.shields.io/github/forks/hanzili/skillsync" alt="forks" />
  </a>
  <a href="https://github.com/hanzili/skillsync/stargazers">
    <img src="https://img.shields.io/github/stars/hanzili/skillsync" alt="stars" />
  </a>
  <a href="https://github.com/hanzili/skillsync/issues/">
    <img src="https://img.shields.io/github/issues/hanzili/skillsync" alt="open issues" />
  </a>
</p>

## Table of Contents

- [Table of Contents](#table-of-contents)
- [Project Description](#project-description)
- [Tech Stack](#tech-stack)
- [Getting Started](#getting-started)
- [Roadmap](#roadmap)


## Project Description

SkillSync is a web application designed to simplify and enrich self-paced learning. The platform allows users to create and enroll in customized "roadmaps" filled with videos, articles, quizzes, and assignments. Each roadmap comes with an integrated forum for discussion and queries, fostering a community of collaborative learners. Whether you're mastering a new skill or diving into a new subject, SkillSync offers a streamlined, interactive way to achieve your learning goals.

## Tech Stack

*   **Frontend:** [React](https://reactjs.org/), [Tailwind](https://tailwindcss.com/) (JavaScript)
*   **Backend:** [NodeJS](https://nodejs.org/en/docs)/[ExpressJS](https://expressjs.com/) (JavaScript)
*   **Database:** [MongoDB](https://www.mongodb.com/docs/)

## Getting Started

### Prerequisites

- Download and install the latest version of Git on your system. See https://git-scm.com/downloads.
- Download and install the latest version of NodeJS and npm on your system. See https://nodejs.org/en/.


### How to Run

- Clone the repository for this project by running the following command in a terminal: 
  ##### `git clone https://github.com/hanzili/skillsync.git`
- Open the cloned folder in VS Code. Open the terminal and make sure its pointing to the root of the cloned project.

- Running Backend Node JS Application:

  - Change the directory to server folder using terminal command: `cd server`
  - At the root of the server directory, create an .env file and copy the content from .env.development into the new .env file. 
  - In the server directory, you can run:

  ##### `npm install`

  - It'll download all the packages/dependencies as defined in package.json file. Once the system completes this process, we can type below command:

  ##### `npm start`

  - Runs the app in the development mode.
  - You can start making http calls to [http://localhost:3001](http://localhost:3001)

- Running Frontend React JS Application:

  - Change the directory to client folder using terminal command: `cd client`
  - At the root of the server directory, create an .env file and copy the content from .env.development into the new .env file. 
  - In the client directory, you can run:

  ##### `npm install`

  - It'll download all the packages/dependencies as defined in package.json file. Once the system completes this process, we can type below command:

  ##### `npm start`

  - Runs the app in the development mode.
  - Open [http://localhost:3000](http://localhost:3000) to view it in the browser

  - The page will reload if you make edits.
  - You will also see any lint errors in the console.

## Roadmap

Current Version: MVP
- *User Authentication*: Enable user login and registration.
- *Roadmap Creation*: Allow users to create roadmaps.
- **Roadmap Enrollment*: Allow users to enroll in existing roadmaps.
- *Forum Integration*: Users can engage in forums linked to specific roadmaps.

## Contribute

- SkillSync appreciates your contribution in any aspects of project development like documenting, UI/UX design, Frontend/Backend development etc.

