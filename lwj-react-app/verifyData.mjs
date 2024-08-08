import mongoose from 'mongoose';

const uri = 'mongodb+srv://ljojjo3goppa:mv3B1opCKzCUQTZg@cluster0.we0mpvv.mongodb.net/ReactCard';

mongoose.connect(uri)
    .then(() => {
        const cardSchema = new mongoose.Schema({
            pic: String,
            name: String,
            age: Number,
            pensioner: Boolean
        });

        const Card = mongoose.model('Card', cardSchema);

        Card.find().then(cards => {
            console.log(cards);
            mongoose.connection.close();
        });
    })
    .catch(err => console.log('MongoDB connection error:', err));