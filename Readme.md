# Project Setup

## Prerequisites

- Node.js (Latest LTS version recommended)
- Git

## Clone the Repository

```sh
git clone https://github.com/Kruthik111/TaskFlow.git
cd TaskFlow
```

## Install Dependencies

```sh
npm install
```

## Running the Project Locally

The project has both the **server** and **client**, but they need to be run separately. Use the following steps to set them up:

### Server Setup

```sh
cd server
npm install
npm run dev
```

### Client Setup

```sh
cd client
npm install
npm run dev
```

Both applications can be run using the `npm run dev` command, but you must navigate to the respective directories first.

## Environment Variables

I am aware that environment files should not be shared on GitHub, but since this project is not going to be deployed and for ease of setup, I have included the `.env` files in the repository.

Create a `.env` file in the root directory and add necessary environment variables if required.

## Project Progress

- **Task 1 (User Login)**: Completed.
- **Task 2 (Add Agents)**: Completed.
- **Task 3 (Upload CSV and Distribute Lists)**: I have completed getting the CSV file from the user and displaying the content on the frontend itself.
