const express = require('express');
const app = express()
const port = 3000;

const colors = require('./utils/colors.js');

// Middleware
app.use(express.static(`${__dirname}/static`));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Upon entering base website, redirect to /home
app.get('/', (req, res) => {
    res.redirect('/home');
});

// Serve home page
app.get('/home', (req, res) => {
    res.sendFile(`${__dirname}/pages/index.html`);
});

// Listen on specified port
app.listen(port, () => {
    console.log(`${colors.text.brightWhite}${colors.background.brightYellow}SERVER${colors.reset}${colors.text.brightYellow} The server is up and running on port ${port}.${colors.reset}`);
});