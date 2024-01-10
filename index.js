import express from 'express';
const app = express()
const port = 3000;

import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

import crypto from 'crypto';

import * as dotenv from 'dotenv';

dotenv.config()

import colors from "./static/js/utils/colors.js";

// Middleware
app.use(express.static(`${__dirname}/static`));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Cryptography
app.post('/api/encrypt', (req, res) => {
    const body = req.body;
    const key = process.env.CRYPTO_KEY;
    const text = body.text;

    const cipher = crypto.createCipher('aes-256-cbc', key);
    let encrypted = cipher.update(text, 'utf-8', 'hex');
    encrypted += cipher.final('hex');
    res.json({ text: encrypted });
});

app.post('/api/decrypt', (req, res) => {
    const body = req.body;
    const key = process.env.CRYPTO_KEY;
    const text = body.text;

    const decipher = crypto.createDecipher('aes-256-cbc', key);
    let decrypted = decipher.update(text, 'hex', 'utf-8');
    decrypted += decipher.final('utf-8');
    res.json({ text: decrypted });
});

// Upon entering base website, redirect to /home
app.get('/', (req, res) => {
    res.redirect('/home');
});

// Serve home page
app.get('/home', (req, res) => {
    res.sendFile(`${__dirname}/pages/index.html`);
});

// Serve edit page
app.get('/edit', (req, res) => {
   res.sendFile(`${__dirname}/pages/edit.html`);
});

// Listen on specified port
app.listen(port, () => {
    console.log(`${colors.text.white}${colors.background.brightYellow}SERVER${colors.reset}${colors.text.yellow} The server is up and running on port ${port}.${colors.reset}`);
});