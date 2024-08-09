import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Card from './Card.jsx';
import pic1 from './assets/Globe.png';


function App() {
    const [cards, setCards] = useState([]);

    useEffect(() => {
        //axios.get('http://localhost:5000/api/cards')
        axios.get('/api/cards') //use for internet (vercel) or use previous line for local server. 
            .then(response => {
                setCards(response.data);
            })
            .catch(error => {
                console.error('There was an error fetching the data!', error);
            });
    }, []);

    return (
        <div className="container">
            <p>Profile Card</p>
            {cards.map((card, index) => (
                <Card 
                    key={index}
                    pic={card.pic || pic1} 
                    name={card.name} 
                    age={card.age} 
                    pensioner={card.pensioner} 
                />
            ))}
        </div>
    );
}

export default App;
