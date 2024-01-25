import React from 'react';

const MarkdownPreview = ({ markdown }) => {
    const convertMarkdownToHtml = (markdownText) => {
        let htmlText = markdownText;

        htmlText = htmlText.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>'); // Bold
        htmlText = htmlText.replace(/_(.*?)_/g, '<em>$1</em>'); // Italics
        htmlText = htmlText.replace(/`([^`]+)`/g, '<code>$1</code>'); // Code
        htmlText = htmlText.replace(/~~(.*?)~~/g, '<del>$1</del>'); // Strikethrough
        htmlText = htmlText.replace(/^\s*-\s*(.*)$/gm, '<li>$1</li>'); // Unordered List
        htmlText = htmlText.replace(/^\s*\d+\.\s*(.*)$/gm, '<li>$1</li>'); // Ordered List
        htmlText = htmlText.replace(/=(.*?)=/g, '<inst>$1</inst>'); // Underline

        return htmlText;
    };

    return (
        <div style={{ marginTop: '20px' }}>
            {/* <h3>Preview:</h3> */}
            <div
                style={{
                    //border: '1px solid #ccc', 
                    //padding: '10px', 
                    //borderRadius: '5px' 
                }}
                dangerouslySetInnerHTML={{ __html: convertMarkdownToHtml(markdown || "") }}
            />
        </div>
    );
};

export default MarkdownPreview;
