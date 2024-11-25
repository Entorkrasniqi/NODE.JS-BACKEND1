import express from 'express';
import { authenticate } from '../middleware/authMiddleware.js';
import { authorizeMediaOwner } from '../middleware/authorizationMiddleware.js';
import { Media } from '../models/Media.js'; // Adjust the import based on your Media model location

const router = express.Router();

// PUT /api/media/:id - Update media item
router.put('/:id', authenticate, authorizeMediaOwner, async (req, res) => {
    const mediaId = req.params.id;
    const { title, description } = req.body;

    try {
        const updatedMedia = await Media.findByIdAndUpdate(mediaId, { title, description }, { new: true });
        res.json(updatedMedia);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
});

// DELETE /api/media/:id - Delete media item
router.delete('/:id', authenticate, authorizeMediaOwner, async (req, res) => {
    const mediaId = req.params.id;

    try {
        await Media.findByIdAndDelete(mediaId);
        res.status(204).send(); // No content
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
});

export default router;
