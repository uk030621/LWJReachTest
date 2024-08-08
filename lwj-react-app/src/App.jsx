import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Card from './Card.jsx';
import pic1 from './assets/react.svg';


function App() {
    const [cards, setCards] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:5000/api/cards')
            .then(response => {
                setCards(response.data);
            })
            .catch(error => {
                console.error('There was an error fetching the data!', error);
            });
    }, []);

    return (
        <div className="container">
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
