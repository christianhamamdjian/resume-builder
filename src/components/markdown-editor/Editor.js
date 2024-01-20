// App.js
import React, { useState } from 'react';
import MarkdownEditor from './MarkdownEditor';
import MarkdownPreview from './MarkdownPreview';

const Editor = () => {
    const [markdowns, setMarkdowns] = useState({});

    const handleInputChange = (id, newMarkdown) => {
        setMarkdowns((prevMarkdowns) => ({
            ...prevMarkdowns,
            [id]: newMarkdown,
        }));
    };

    const handleStyleClick = (id, tag) => {
        const start = document.getElementById(`markdownTextarea-${id}`).selectionStart;
        const end = document.getElementById(`markdownTextarea-${id}`).selectionEnd;
        const newText =
            markdowns[id].substring(0, start) +
            `${tag}${markdowns[id].substring(start, end)}${tag}` +
            markdowns[id].substring(end);
        setMarkdowns((prevMarkdowns) => ({
            ...prevMarkdowns,
            [id]: newText,
        }));
    };

    return (
        <div>
            <div style={{ display: 'flex', gap: '20px' }}>
                <MarkdownEditor
                    id={1}
                    markdown={markdowns[1] || ''}
                    onInputChange={handleInputChange}
                    onStyleClick={handleStyleClick}
                />
                <MarkdownPreview markdown={markdowns[1] || ''} />
            </div>

            <div style={{ display: 'flex', gap: '20px', marginTop: '20px' }}>
                <MarkdownEditor
                    id={2}
                    markdown={markdowns[2] || ''}
                    onInputChange={handleInputChange}
                    onStyleClick={handleStyleClick}
                />
                <MarkdownPreview markdown={markdowns[2] || ''} />
            </div>

            {/* Add more instances as needed */}
        </div>
    );
};

export default Editor;
