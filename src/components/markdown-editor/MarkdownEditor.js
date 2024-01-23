import React from 'react';
import MarkdownInput from './MarkdownInput';
import MarkdownButtons from './MarkdownButtons';

const MarkdownEditor = ({ id, markdown, onInputChange, onStyleClick }) => {

    return (
        <div>
            <MarkdownInput id={id} markdown={markdown} onInputChange={onInputChange} />
            <MarkdownButtons id={id} onStyleClick={onStyleClick} />
        </div>
    );
};

export default MarkdownEditor;
