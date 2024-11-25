// server.js
import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import authRoutes from './routes/auth.js';

const app = express();
const PORT = process.env.PORT || 6000;

// Set the view engine to Pug
app.set('view engine', 'pug');

// Set the views directory
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.set('views', path.join(__dirname, 'views'));

// Serve static files from the media folder
app.use('/media', express.static(path.join(__dirname, 'media')));

// Mock data for the API
const mockData = [
    { id: 1, name: 'Item 1', image: '/media/astronaut.png' },
    { id: 2, name: 'Item 2', image: '/media/shuttle.png' },
];

// Serve the index page
app.get('/', (req, res) => {
    res.render('index', { title: 'Node.js Express App', items: mockData });
});

// API Endpoints
app.get('/api/data', (req, res) => {
    res.status(200).json(mockData); // Return all items
});

app.post('/api/data', (req, res) => {
    const newItem = { id: mockData.length + 1, name: req.body.name, image: '/media/default.jpg' };
    mockData.push(newItem);
    res.status(201).json(newItem); // Return the created item
});

app.delete('/api/data/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const index = mockData.findIndex(item => item.id === id);
    if (index !== -1) {
        mockData.splice(index, 1);
        res.status(204).send(); // No content
    } else {
        res.status(404).json({ message: 'Item not found' });
    }
});

app.put('/api/data/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const item = mockData.find(item => item.id === id);
    if (item) {
        item.name = req.body.name;
        res.status(200).json(item); // Return the updated item
    } else {
        res.status(404).json({ message: 'Item not found' });
    }
});

app.get('/api/data/search', (req, res) => {
    const name = req.query.name;
    const results = mockData.filter(item => item.name.includes(name));
    res.status(200).json(results); // Return matching items
});

app.use('/api/auth', authRoutes);

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});