# TypeScript Express API

A simple boilerplate project for creating a RESTful API using Node.js, Express, and TypeScript.

---

## Project Structure

```bash
typescript-express-api/
│
├─ src/
│  ├─ __tests__/
│  │  └─ app.test.ts      # Jest test suite for the API
│  ├─ data/
│  │  └─ players.json     # Initial player data
│  ├─ routes/
│  │  ├─ player.ts        # Player-related API endpoints
│  │  └─ random.ts        # Random number endpoint
│  ├─ app.ts               # Main Express application setup
│  ├─ server.ts            # Server bootstrap file
│  ├─ storage.ts           # Logic for file-based data persistence
│  └─ types.ts             # TypeScript interfaces and types
│
├─ package.json            # Project dependencies and scripts
├─ tsconfig.json           # TypeScript compiler configuration
└─ README.md               # This file
```

## Features & Description

This project provides a clean and organized starting point for a backend API.

TypeScript: Leverages TypeScript for type safety, modern JavaScript features, and a better developer experience, reducing runtime errors.

Express: Built on the fast, unopinionated, and minimalist web framework for Node.js, making it easy to create robust APIs.

Jest & Supertest: Includes a testing setup with Jest and Supertest for writing and running comprehensive API tests.

Nodemon: Configured for development to automatically restart the server whenever file changes are detected, speeding up the development cycle.

## Setup

Prerequisites

- Node.js (v16 or newer recommended)
- npm or yarn

Installation

1. Clone the repository:

```bash
git clone <repository-url>
cd typescript-express-api
```

2.Install dependencies:

```bash
npm install
```

## Running the Application & Tests

Several scripts are available to streamline development and testing:

- Run in development mode:

```bash
npm run dev
```

- Build for production:

```bash
npm run dev
```

- Run in production mode: (Requires a build first)

```bash
npm start
```

- Run tests:

```bash
npm test
```

## API Endpoints

- GET /: Welcome message.
- GET /random: Returns a random number.
- GET /players: Returns a list of all players.
- GET /players/:id: Returns a single player by their ID.
- POST /players: Creates a new player. Requires a JSON body with name (string) and power (number).
