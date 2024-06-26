import React from 'react';

const MarkdownInput = ({ id, parent, index, markdown, onInputChange }) => {
    const handleInputChange = (event) => {
        onInputChange(event, id, index);
    };

    return (
        <textarea
            id={`${parent}-${id}-${index}`}
            value={markdown}
            onChange={handleInputChange}
            placeholder={`Type your Markdown here (Editor ${id})...`}
            style={{ width: '100%', minHeight: '200px', fontSize: '16px', padding: '10px', background: "#F2F2F2", border: "1px solid #ECECEC", borderRadius: "4px", }}
        />
    );
};

export default MarkdownInput;
