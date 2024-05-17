# Using SSH Tunnels to Connect to Remote Databases

## Overview
When working with remote databases, security is a primary concern. One way to secure your database connections is by using SSH tunnels. This article provides an overview of when and why you might need an SSH tunnel to connect to a remote database, along with a brief explanation of how the provided `index.js` files facilitate this process.

## When to Use an SSH Tunnel

### Secure Data Transmission
When you need to transmit data securely over an unsecured network, such as the internet, an SSH tunnel encrypts your data, preventing eavesdropping and man-in-the-middle attacks.

### Accessing Databases Behind Firewalls
If your database is behind a firewall and not directly accessible, an SSH tunnel allows you to securely connect to the database by tunneling through a server that does have access.

### Remote Development
When developing applications remotely, you might need to connect to a database located in a different network. An SSH tunnel ensures that your connection is secure and reliable.

### Bypassing Network Restrictions
In some cases, network restrictions may block direct database connections. An SSH tunnel can bypass these restrictions by routing your connection through an allowed SSH server.

## Explanation of the Files

### `/models/index.js`
This file sets up the SSH tunnel and connects to the MySQL database. Here's a brief overview of what it does:

- **Modules and Variables**: Requires necessary modules (`fs`, `mysql2`, `ssh2`) and initializes configuration variables from environment variables.
- **SSH Client Initialization**: Creates an SSH client instance.
- **Configuration**: Defines configuration for the database server, SSH tunnel, and port forwarding.
- **SSH Connection Promise**: Establishes an SSH connection, sets up port forwarding, and creates a MySQL connection through the forwarded port.
- **Exports**: Exports the SSH connection promise and SSH client instance for use in other files.

### Example Snippet
```javascript
const { Client } = require('ssh2');
const sshClient = new Client();

const tunnelConfig = {
    host: process.env.DB_SSH_HOST,
    port: 22,
    username: process.env.DB_SSH_USER,
    privateKey: fs.readFileSync(process.env.DB_SSH_KEY),
};
```

### Main `index.js`
This file demonstrates how to use the SSH tunnel and MySQL connection established in the `/models/index.js` file. Here's a brief overview:

- **Load Environment Variables**: Loads environment variables from a `.env` file.
- **Import SSH Connection**: Imports the SSH connection promise and SSH client instance from the `/models` directory.
- **Establish Connection**: Uses the promise to establish a connection to the MySQL database.
- **Execute Query**: Runs a sample query to demonstrate database interaction.
- **Close Connections**: Closes the MySQL connection and SSH tunnel after the query execution.

### Example Snippet
```javascript
const { SSHConnection, sshClient } = require('./models/index.js');

SSHConnection.then((connection) => {
    connection.query('SELECT 5 + 5 AS sum', (error, results) => {
        if (error) throw error;
        console.log('The sum is: ', results[0].sum);

        connection.end();
        sshClient.end();
    });
}).catch((error) => {
    console.error('Error connecting to the database:', error);
});
```

## Conclusion
Using SSH tunnels is a vital practice for ensuring secure and reliable connections to remote databases, especially in scenarios where direct access is restricted or the network is untrusted. The provided `index.js` files demonstrate a practical implementation of setting up an SSH tunnel and connecting to a MySQL database, serving as a template for your own projects.

For more detailed explanations and complete code examples, refer to the markdown files created for each specific file.
