import React from 'react';

const MarkdownInput = ({ id, markdown, onInputChange }) => {
    const handleInputChange = (event) => {
        onInputChange(id, event.target.value);
    };

    return (
        <textarea
            id={`markdownTextarea-${id}`}
            value={markdown}
            onChange={handleInputChange}
            placeholder={`Type your Markdown here (Editor ${id})...`}
            style={{ width: '100%', minHeight: '200px', fontSize: '16px', padding: '10px' }}
        />
    );
};

export default MarkdownInput;
