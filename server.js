import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import rateLimit from 'express-rate-limit';
import xss from 'xss-clean';
import mongoSanitize from 'express-mongo-sanitize';
import authRoutes from './routes/auth.js'; // Adjust the import based on your file structure

const app = express();

// Use Helmet to set various HTTP headers for security
app.use(helmet());

// Enable CORS with proper configuration
app.use(cors());

// Rate limiting to prevent brute-force attacks
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100 // limit each IP to 100 requests per windowMs
});
app.use(limiter);

// Data sanitization against XSS
app.use(xss());

// Data sanitization against NoSQL injection
app.use(mongoSanitize());

// Body parser middleware
app.use(express.json());

// Use auth routes
app.use('/api/auth', authRoutes);

// Your existing routes here

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));