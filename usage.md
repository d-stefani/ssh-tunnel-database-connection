# Using SSH Tunnel and MySQL Connection

## Overview
This document explains how the second `index.js` file utilizes the SSH tunnel and MySQL connection established in the first `index.js` file located in the `/models` directory.

## Code Breakdown

1. **Load Environment Variables**
    ```javascript
    require('dotenv').config();
    ```
    - Loads environment variables from a `.env` file, which are required for configuring the SSH and MySQL connections.

2. **Import SSH Connection and Client**
    ```javascript
    const { SSHConnection, sshClient } = require('./models/index.js');
    ```
    - Imports the `SSHConnection` promise and the `sshClient` instance from the first file.

3. **Establish Database Connection**
    ```javascript
    SSHConnection.then((connection) => {
        console.log('Connected to the database!');
    ```
    - Uses the `SSHConnection` promise to establish a connection to the MySQL database through the SSH tunnel. If successful, it logs a message indicating the connection is established.

4. **Execute Example Query**
    ```javascript
        connection.query('SELECT 5 + 5 AS sum', (error, results) => {
            if (error) throw error;
            console.log('The sum is: ', results[0].sum);
    ```
    - Executes a simple SQL query to demonstrate how to interact with the database once connected. It logs the result of the query.

5. **Close Connections**
    ```javascript
            connection.end((err) => {
                if (err) {
                    console.error('Error closing the connection:', err);
                } else {
                    console.log('Connection closed.');
                }
                sshClient.end();
            });
        });
    }).catch((error) => {
        console.error('Error connecting to the database:', error);
    });
    ```
    - Closes the MySQL connection and the SSH client after the query is executed. If there is an error at any stage, it logs the error.

## Summary
This `index.js` file serves as a practical example of how to use the SSH tunnel and MySQL connection functionality defined in the first `models/index.js` file. It shows the process of establishing a secure connection to a remote database, executing a query, and properly closing the connection.
