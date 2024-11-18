// server.js
import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

// Create an Express application
const app = express();
const PORT = process.env.PORT || 6000;

// Set the view engine to Pug
app.set('view engine', 'pug');

// Set the views directory
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.set('views', path.join(__dirname, 'views'));

// Serve the index page
app.get('/', (req, res) => {
    res.render('index'); // Render the index.pug file
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});