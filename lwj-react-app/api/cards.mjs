import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config(); // Load environment variables from .env file

const app = express();
const port = 5000;

app.use(cors()); // Enable CORS for all origins
app.use(express.json());

// Connect to MongoDB Atlas using environment variable
const uri = process.env.MONGODB_URI;
mongoose.connect(uri)
    .then(() => console.log('MongoDB connected successfully'))
    .catch(err => console.log('MongoDB connection error:', err));

const cardSchema = new mongoose.Schema({
    pic: String,
    name: String,
    age: Number,
    pensioner: Boolean
});

const Card = mongoose.model('Card', cardSchema);

// Sample data route
app.get('/api/cards', async (req, res) => {
    try {
        const cards = await Card.find();
        res.json(cards);
    } catch (error) {
        res.status(500).send(error);
    }
});

app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});
