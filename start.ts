// Importing required modules and libraries
import express, { Express, Request, Response } from 'express'; // Express framework for building the server
const bp = require("body-parser"); // Exporting Body Parser
import dotenv from 'dotenv'; // dotenv for loading environment variables
import { API_ENDPOINTS } from './Types/Server'; // Importing API endpoints
import { router as userRouter } from './Routes/User'; // Importing the router for handling routes
import { nsql_db } from './Utils/Database/db.client'; // Importing the database client
import { router as loginRouter } from './Routes/Login';
const jwt = require('jsonwebtoken');

dotenv.config(); // Loading environment variables from .env file

const app: Express = express(); // Creating an instance of the Express application
const port = process.env.PORT; // Fetching the port number from environment variables

app.use(bp.json());
app.use(bp.urlencoded({ extended: true }));
app.use('/', userRouter); // Registering the router for handling routes
app.use('/login', loginRouter)

// Starting the server
app.listen(port, async () => {
    await initializeDataSources(); // Initializing data sources before starting the server
    console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});

// Function to initialize data sources
async function initializeDataSources() {
    try {
        console.log('Initializing datasources.');
        await nsql_db.$connect(); // Connecting to the database
        console.log('Datasources initialised');
    } catch (err) {
        console.log('DataSource initialisation failed. Details: ', err);
        process.exit(1); // Exiting the process with an error code if data source initialization fails
    }
}
