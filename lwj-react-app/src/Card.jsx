import React, { useState } from 'react';

function Card({ _id, pic, name, age, pensioner, onUpdate, onDelete }) {
    const [isEditing, setIsEditing] = useState(false);
    const [updatedCard, setUpdatedCard] = useState({ name, age, pensioner, pic });

    const handleUpdate = () => {
        onUpdate(updatedCard);
        setIsEditing(false);
    };

    return (
        <div className="card">
            <img className="card-image" src={pic || '/assets/Globe.png'} alt="profile picture" />
            {isEditing ? (
                <>
                    <input
                        type="text"
                        value={updatedCard.name}
                        onChange={(e) => setUpdatedCard({ ...updatedCard, name: e.target.value })}
                    />
                    <input
                        type="number"
                        value={updatedCard.age}
                        onChange={(e) => setUpdatedCard({ ...updatedCard, age: e.target.value })}
                    />
                    <input
                        type="text"
                        value={updatedCard.pic}
                        onChange={(e) => setUpdatedCard({ ...updatedCard, pic: e.target.value })}
                    />
                    <label>
                        Pensioner:
                        <input
                            type="checkbox"
                            checked={updatedCard.pensioner}
                            onChange={(e) => setUpdatedCard({ ...updatedCard, pensioner: e.target.checked })}
                        />
                    </label>
                    <button onClick={handleUpdate}>Save</button>
                </>
            ) : (
                <>
                    <p>Name: {name}</p>
                    <p>Age: {age}</p>
                    <p>Pensioner: {pensioner ? "Yes" : "No"}</p>
                </>
            )}
            <button onClick={() => setIsEditing(!isEditing)}>Edit</button>
            <button onClick={onDelete}>Delete</button>
        </div>
    );
}

export default Card;
