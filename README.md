# WTWR — What to Wear?

WTWR is a full-stack weather-based clothing recommendation application. It uses the user's local weather conditions to recommend suitable clothing items.

This repository contains the **React frontend** of the application. It communicates with a separate REST API backend responsible for authentication, user data, and clothing-item management.

## Full-Stack Project Repositories

- **Frontend:** [WTWR Frontend](https://github.com/chrydan1/wtwr-frontend)
- **Backend:** [WTWR Backend](https://github.com/chrydan1/se_project_express)

## Main Features

- Displays the current temperature and weather conditions
- Recommends clothing based on the local weather
- Allows users to create an account and log in
- Uses JWT authentication and protected routes
- Allows users to add and delete clothing items
- Allows users to like and unlike clothing items
- Allows users to update their profile information
- Connects the React frontend to a Node.js and Express REST API

## Technologies

### Frontend

- React
- JavaScript
- Vite
- React Router
- CSS
- REST API integration

### Backend

- Node.js
- Express.js
- MongoDB
- Mongoose
- JSON Web Tokens
- REST API

## Project Architecture

The application is divided into two connected repositories:

1. The React frontend displays the interface and sends HTTP requests.
2. The Express backend processes those requests, manages authentication, and communicates with MongoDB.
3. The backend returns data to the frontend as JSON.
4. The frontend updates the user interface using the received data.

## Running the Frontend Locally

Clone the repository:

```bash
git clone https://github.com/chrydan1/wtwr-frontend.git
