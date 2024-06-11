# BuzzBlog

BuzzBlog is a powerful blogging platform built with a custom backend framework called `wayofnode` and a frontend framework named `wayofjs`. This project aims to provide a robust and scalable blogging solution with features such as user authentication, session management, and a modular component-based architecture.

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [Features](#features)
- [License](#license)

## Installation

1. Clone the repository:
   ```sh
   git clone https://github.com/vikraj01/buzzblog.git
   cd buzzblog
   ```

2. Install the dependencies:
   ```sh
   npm install
   ```

3. Set up environment variables:
   - Create a `.env` file in the root directory.
   - Add the following environment variables:
     ```env
     DATABASE_URL=your_database_url
     SESSION_SECRET=your_session_secret
     ```

4. Run the database migrations:
   ```sh
   npm run migrate
   ```

5. Start the development server:
   ```sh
   npm run dev
   ```

## Usage

- The development server will be available at `http://localhost:3000`.
- Navigate to this URL to see the BuzzBlog in action.

## Features

- **Authentication**: User authentication using Passport.js.
- **Session Management**: Secure session handling.
- **Modular Architecture**: Component-based structure for both frontend and backend.
- **Custom Backend Framework**: Built using `wayofnode` for a tailored backend solution.
- **Custom Frontend Framework**: Built using `wayofjs` for a dynamic and interactive user interface.

