import React from 'react';
import DOMPurify from 'dompurify'

const MarkdownPreview = ({ markdown }) => {
    const convertMarkdownToHtml = (markdownText) => {
        let htmlText = markdownText;

        htmlText = htmlText.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>'); // Bold
        htmlText = htmlText.replace(/_(.*?)_/g, '<em>$1</em>'); // Italics
        htmlText = htmlText.replace(/`([^`]+)`/g, '<code>$1</code>'); // Code
        htmlText = htmlText.replace(/~~(.*?)~~/g, '<del>$1</del>'); // Strikethrough
        htmlText = htmlText.replace(/^\s*-\s*(.*)$/gm, '<li>$1</li>'); // Unordered List
        htmlText = htmlText.replace(/^\s*\d+\.\s*(.*)$/gm, '<li>$1</li>'); // Ordered List
        htmlText = htmlText.replace(/=(.*?)=/g, '<ins>$1</ins>'); // Underline

        return htmlText;
    };
    const sanitizedData = () => ({
        __html: DOMPurify.sanitize(convertMarkdownToHtml(markdown || ""))
    })
    return (
        <div style={{ marginTop: '20px' }}>
            <div
                dangerouslySetInnerHTML={sanitizedData()}
            />
        </div>
    );
};

export default MarkdownPreview;
