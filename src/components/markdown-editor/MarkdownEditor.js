import React from 'react';
import MarkdownInput from './MarkdownInput';
import MarkdownButtons from './MarkdownButtons';

const MarkdownEditor = ({ id, index, markdown, onInputChange, onStyleClick }) => {

    return (
        <div>
            <MarkdownInput id={id} index={index} markdown={markdown} onInputChange={onInputChange} />
            <MarkdownButtons id={id} index={index} onStyleClick={onStyleClick} />
        </div>
    );
};

export default MarkdownEditor;
