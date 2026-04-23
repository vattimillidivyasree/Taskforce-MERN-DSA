const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');

// Initialize the app and config *first*
const app = express();
dotenv.config();

// --- 1. CONFIGURATION ---
const PORT = process.env.PORT || 5000;
const mongoURI = process.env.MONGO_URI; 
const FRONTEND_URL = 'https://dsa-task-manager-frontend-a7kedbn5o-trishas-projects-5eaae829.vercel.app';

// --- 2. MIDDLEWARE (Use app.use() only AFTER const app = express()) ---

// 2a. CORS Middleware (Must be first for security)
app.use(cors({
    origin: FRONTEND_URL, 
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
}));

// 2b. Body Parser
app.use(express.json());

// --- 3. DATABASE CONNECTION ---
// Using mongoose.connect directly, as your connectDB/dotenv logic was mixed up.
mongoose.connect(mongoURI)
    .then(() => {
        console.log('MongoDB Connected successfully!');
    })
    .catch(err => {
        console.error('MongoDB connection error:', err);
    });

// --- 4. ROUTES ---
const taskRoutes = require('./routes/taskRoutes');

app.get('/', (req, res) => {
    res.send('Task Manager API is running!');
});

app.use('/api/tasks', taskRoutes);

// --- 5. SERVER START ---
app.listen(PORT, () => console.log(`Task Manager API is running on port ${PORT}`));