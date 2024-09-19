# Virtual Illumination Lamp Platform

This is an online platform for lighting virtual illumination lamps, developed using Vue.js 3. Users can light lamps for themselves and their loved ones, offering prayers and blessings.

Visit the website: [Virtual Illumination Lamp Platform](https://jerryliu208.github.io/virtual-illumination-lamp/)

## Features

- User registration and login
- Browse and select from various types of illumination lamps
- Light lamps and leave prayer messages
- View lamp status and personal order history
- User profile management
- Admin backend system for managing users, lamps, orders, and system settings

## Technology Stack

- Vue.js 3
- Vue Router 4
- Vuex 4
- Axios (for API calls simulation)

## Prerequisites

- Node.js (v14 or higher)
- npm (v6 or higher)

## Local Development Setup

1. Clone the repository:
   ```
   git clone https://github.com/your-username/virtual-illumination-lamp.git
   ```

2. Navigate to the project directory:
   ```
   cd virtual-illumination-lamp
   ```

3. Install dependencies:
   ```
   npm install
   ```

4. Run the development server:
   ```
   npm run serve
   ```

5. Open your browser and visit `http://localhost:8080`

## Building for Production

To build the project for production:

```
npm run build
```

## Docker Support

This project includes Docker support. To run the project using Docker:

1. Build the Docker image:
   ```
   docker build -t virtual-illumination-lamp .
   ```

2. Run the Docker container:
   ```
   docker-compose up
   ```

## Deployment

This project is set up to automatically deploy to GitHub Pages when changes are pushed to the main branch.

## Contributing

Contributions to this project are welcome. Please feel free to submit a Pull Request.
