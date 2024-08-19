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

// Create a new card
app.post('/api/cards', async (req, res) => {
    try {
        const newCard = new Card(req.body);
        await newCard.save();
        res.status(201).json(newCard);
    } catch (error) {
        res.status(400).send(error);
    }
});

// Update an existing card
app.put('/api/cards/:id', async (req, res) => {
    try {
        const updatedCard = await Card.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(updatedCard);
    } catch (error) {
        res.status(400).send(error);
    }
});

// Delete a card
app.delete('/api/cards/:id', async (req, res) => {
    try {
        await Card.findByIdAndDelete(req.params.id);
        res.status(204).send();
    } catch (error) {
        res.status(400).send(error);
    }
});








app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});
