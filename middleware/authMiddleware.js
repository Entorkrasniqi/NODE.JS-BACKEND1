import jwt from 'jsonwebtoken';
// import { Users, Media } from '../models'; // Adjust the import based on your models
import { Media } from '../models'; // Adjust the import based on your models

const JWT_SECRET = 'your_jwt_secret'; // Use the same secret as in auth.js

export const authenticate = (req, res, next) => {
    const token = req.header('Authorization')?.replace('Bearer ', '');

    if (!token) {
        return res.status(401).json({ message: 'No token, authorization denied' });
    }

    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        req.user = decoded; // Attach user info to request
        next();
    } catch {
        res.status(401).json({ message: 'Token is not valid' });
    }
};

// Check if the user is the owner of the media item
export const authorizeMediaOwner = async (req, res, next) => {
    const mediaId = req.params.id;
    const userId = req.user.userId; // Assuming userId is stored in req.user from the JWT

    try {
        const mediaItem = await Media.findById(mediaId);
        if (!mediaItem) {
            return res.status(404).json({ message: 'Media item not found' });
        }

        if (mediaItem.user_id !== userId) {
            return res.status(403).json({ message: 'Unauthorized: You do not own this media item' });
        }

        next();
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};

// Check if the user is updating their own information
export const authorizeUserUpdate = (req, res, next) => {
    const userId = req.user.userId; // Assuming userId is stored in req.user from the JWT
    const targetUserId = req.body.user_id; // Assuming the user ID to update is sent in the request body

    if (userId !== targetUserId) {
        return res.status(403).json({ message: 'Unauthorized: You can only update your own information' });
    }

    next();
};
