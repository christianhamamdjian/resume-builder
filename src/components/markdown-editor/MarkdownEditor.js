// MarkdownEditor.js
import React from 'react';
import MarkdownInput from './MarkdownInput';

const MarkdownEditor = ({ id, markdown, onInputChange, onStyleClick }) => {
    const handleStyle = (tag) => {
        onStyleClick(id, tag);
    };

    return (
        <div>
            <MarkdownInput id={id} markdown={markdown} onInputChange={onInputChange} />
            <div style={{ marginTop: '10px', padding: '5px' }}>
                <button onClick={() => handleStyle('**')}>Bold</button>
                <button onClick={() => handleStyle('_')}>Italic</button>
                <button onClick={() => handleStyle('`')}>Code</button>
                <button onClick={() => handleStyle('~~')}>Strikethrough</button>
                <button onClick={() => handleStyle('- ')}>Unordered List</button>
                <button onClick={() => handleStyle('1. ')}>Ordered List</button>
                <button onClick={() => handleStyle('__')}>Underline</button>
                {/* Add more styling options as needed */}
            </div>
        </div>
    );
};

export default MarkdownEditor;
