import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Card from './Card.jsx';

const API_BASE_URL = 
  window.location.hostname === 'localhost'
  ? 'http://localhost:5000/api/cards'
  : '/api/cards';

function App() {
    const [cards, setCards] = useState([]);
    const [newCard, setNewCard] = useState({ name: '', age: '', pensioner: false, pic: '' });

    useEffect(() => {
        axios.get(API_BASE_URL)
            .then(response => setCards(response.data))
            .catch(error => console.error('There was an error fetching the data!', error));
    }, []);

    const createCard = () => {
        axios.post(API_BASE_URL, newCard)
            .then(response => {
                setCards([...cards, response.data]);
                setNewCard({ name: '', age: '', pensioner: false, pic: '' }); // Clear the input fields
            })
            .catch(error => console.error('Error creating card:', error));
    };

    const updateCard = (id, updatedCard) => {
        axios.put(`${API_BASE_URL}/${id}`, updatedCard)
            .then(response => setCards(cards.map(card => (card._id === id ? response.data : card))))
            .catch(error => console.error('Error updating card:', error));
    };

    const deleteCard = (id) => {
        axios.delete(`${API_BASE_URL}/${id}`)
            .then(() => setCards(cards.filter(card => card._id !== id)))
            .catch(error => console.error('Error deleting card:', error));
    };

    return (
        <div className="container-input">
            <div>
                <input
                    type="text"
                    placeholder="Name"
                    value={newCard.name}
                    onChange={(e) => setNewCard({ ...newCard, name: e.target.value })}
                />
                <input
                    type="number"
                    placeholder="Age"
                    value={newCard.age}
                    onChange={(e) => setNewCard({ ...newCard, age: e.target.value })}
                />
                <input
                    type="text"
                    placeholder="Image URL"
                    value={newCard.pic}
                    onChange={(e) => setNewCard({ ...newCard, pic: e.target.value })}
                />
                <label className='employed-label'>
                    Employed?:
                    <input
                        type="checkbox"
                        checked={newCard.pensioner}
                        onChange={(e) => setNewCard({ ...newCard, pensioner: e.target.checked })}
                    />
                </label>
                <br>
                </br>
                <br>
                </br>
                <div className='container-create-button'>
                    <button className="create-card-button" onClick={createCard}>Create Card</button>
                </div>
            </div>
            <div className='container'>
                {cards.map((card, index) => (
                    <Card
                        key={index}
                        {...card}
                        onUpdate={(updatedCard) => updateCard(card._id, updatedCard)}
                        onDelete={() => deleteCard(card._id)}
                    />
                ))}
            </div>
        </div>
    );
}

export default App;
