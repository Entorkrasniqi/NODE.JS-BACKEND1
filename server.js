// server.js
const express = require('express');
const { v4: uuidv4 } = require('uuid'); // Import uuid for unique ID generation
const app = express();
const PORT = 3000;

// Middleware to parse JSON bodies
app.use(express.json());

// Simulated real data (could be fetched from a database)
let data = [
    { id: uuidv4(), name: 'Item 1' },
    { id: uuidv4(), name: 'Item 2' },
];

// 1. Read some data from server
app.get('/api/data', (req, res) => {
    res.json(data);
});

// 2. Send some data to server
app.post('/api/data', (req, res) => {
    const newItem = req.body;
    if (!newItem.name) {
        return res.status(400).json({ error: 'Name is required' });
    }
    newItem.id = uuidv4(); // Generate a unique ID
    data.push(newItem);
    res.status(201).json(newItem);
});

// 3. Delete data
app.delete('/api/data/:id', (req, res) => {
    const { id } = req.params;
    const index = data.findIndex(item => item.id === id);
    if (index === -1) {
        return res.status(404).json({ error: 'Item not found' });
    }
    data.splice(index, 1);
    res.status(204).send(); // No content
});

// 4. Modify something
app.put('/api/data/:id', (req, res) => {
    const { id } = req.params;
    const index = data.findIndex(item => item.id === id);
    if (index === -1) {
        return res.status(404).json({ error: 'Item not found' });
    }
    const updatedItem = req.body;
    if (!updatedItem.name) {
        return res.status(400).json({ error: 'Name is required' });
    }
    data[index] = { ...data[index], ...updatedItem };
    res.json(data[index]);
});

// 5. Search for items by name
app.get('/api/data/search', (req, res) => {
    const { name } = req.query;
    if (!name) {
        return res.status(400).json({ error: 'Name query parameter is required' });
    }
    const results = data.filter(item => item.name.toLowerCase().includes(name.toLowerCase()));
    res.json(results);
});

// 6. Send 404 response for non-existing resources
app.use((req, res) => {
    res.status(404).json({ error: 'Resource not found' });
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});