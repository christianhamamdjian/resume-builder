import React from 'react';
import DOMPurify from 'dompurify'

const MarkdownPreview = ({ markdown }) => {
    const convertMarkdownToHtml = (markdownText) => {
        let htmlText = markdownText;

        htmlText = htmlText.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>'); // Bold
        htmlText = htmlText.replace(/_(.*?)_/g, '<em>$1</em>'); // Italics
        htmlText = htmlText.replace(/`([^`]+)`/g, '<code>$1</code>'); // Code
        htmlText = htmlText.replace(/~~(.*?)~~/g, '<del>$1</del>'); // Strikethrough
        htmlText = htmlText.replace(/^\s*-\s*(.*)$/gm, '<ul><li>$1</li></ul>'); // Unordered List
        htmlText = htmlText.replace(/^\s*\d+\.\s*(.*)$/gm, '<ol><li>$1</li></ol>'); // Ordered List
        htmlText = htmlText.replace(/=(.*?)=/g, '<ins>$1</ins>'); // Underline

        return htmlText;
    };
    const sanitizedData = () => ({
        __html: DOMPurify.sanitize(convertMarkdownToHtml(markdown || ""))
    })
    return (
        <>
            {
                markdown !== "" && <div style={{ marginTop: '20px' }}>
                    <pre
                        dangerouslySetInnerHTML={sanitizedData()}
                    />
                </div>
            }</>
    );
};

export default MarkdownPreview;
