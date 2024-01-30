import React, { useState } from 'react';

const Suggestions = () => {
    const [inputText, setInputText] = useState('');
    const [suggestedText, setSuggestedText] = useState('');

    const handleInputChange = (e) => {
        setInputText(e.target.value);
    };

    const handleFormSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch('/.netlify/functions/getSuggestions', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ prompt: inputText }),
            });

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            const data = await response.json();
            setSuggestedText(data.suggestions);
        } catch (error) {
            console.error('Error fetching suggestions:', error);
        }
    };

    return (
        <div>
            <form onSubmit={handleFormSubmit}>
                <input type="text" value={inputText} onChange={handleInputChange} />
                <button type="submit">Get Suggestions</button>
            </form>
            {suggestedText && <p>Suggested Text: {suggestedText}</p>}
        </div>
    );
};

export default Suggestions;
