require('dotenv').config();
const { SSHConnection, sshClient } = require('./models/index.js');

SSHConnection.then((connection) => {
    console.log('Connected to the database!');

    // Example query
    cconnection.query('SELECT 5 + 5 AS sum', (error, results) => {
        if (error) throw error;
        console.log('The sum is: ', results[0].sum);

        // Close the connection
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
