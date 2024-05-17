# index.js Function Explanations

## Overview
This file establishes a secure SSH tunnel to a remote MySQL database server and sets up a connection to the database through this tunnel.

## Code Breakdown

1. **Required Modules and Variables**
    ```javascript
    const fs = require('fs');
    const mysql = require('mysql2');
    const { Client } = require('ssh2');
    ```
    - `fs`: File system module to read the private SSH key from the file system.
    - `mysql`: MySQL client to interact with the MySQL database.
    - `Client`: SSH2 client to create an SSH tunnel.

2. **SSH Client Initialization**
    ```javascript
    const sshClient = new Client();
    ```
    - Initializes a new SSH client using the `ssh2` library.

3. **Database Server Configuration**
    ```javascript
    const dbServer = {
        host: process.env.DB_HOST,
        port: process.env.DB_PORT,
        user: process.env.DB_USERNAME,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_DATABASE
    };
    ```
    - Contains configuration details for the MySQL database, loaded from environment variables.

4. **SSH Tunnel Configuration**
    ```javascript
    const tunnelConfig = {
       host: process.env.DB_SSH_HOST,
       port: 22,
       username: process.env.DB_SSH_USER,
       privateKey: fs.readFileSync(process.env.DB_SSH_KEY),
    };
    ```
    - Contains configuration details for the SSH connection, including the host, port, username, and private key for authentication.

5. **Port Forwarding Configuration**
    ```javascript
    const forwardConfig = {
        srcHost: '127.0.0.1',
        srcPort: 3306,
        dstHost: dbServer.host,
        dstPort: dbServer.port
    };
    ```
    - Specifies the source and destination hosts and ports for forwarding the MySQL traffic through the SSH tunnel.

6. **SSH Connection Promise**
    ```javascript
    const SSHConnection = new Promise((resolve, reject) => {
        sshClient.on('ready', () => {
            sshClient.forwardOut(
                forwardConfig.srcHost,
                forwardConfig.srcPort,
                forwardConfig.dstHost,
                forwardConfig.dstPort,
                (err, stream) => {
                    if (err) reject(err);
                    const updatedDbServer = {
                        ...dbServer,
                        stream
                    };
                    const connection = mysql.createConnection(updatedDbServer);
                    connection.connect((error) => {
                        if (error) {
                            reject(error);
                        }
                        resolve(connection);
                    });
                }
            );
        }).connect(tunnelConfig);
    });
    ```
    - Creates a new SSH connection promise.
    - When the SSH client is ready, it sets up port forwarding from the local machine to the remote MySQL server.
    - Creates a MySQL connection using the forwarded stream and resolves the connection if successful, or rejects the promise if there is an error.

7. **Exports**
    ```javascript
    module.exports = { SSHConnection, sshClient };
    ```
    - Exports the `SSHConnection` promise and the `sshClient` instance for use in other parts of the application.
