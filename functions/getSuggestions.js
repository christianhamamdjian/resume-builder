require('dotenv').config();
const fetch = require('node-fetch');

exports.handler = async function (event, context) {
    const { prompt } = JSON.parse(event.body);
    const openaiApiKey = process.env.OPENAI_API_KEY;

    try {
        const response = await fetch('https://api.openai.com/v1/engines/gpt-3.5-turbo/completions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${openaiApiKey}`,
            },
            body: JSON.stringify({
                prompt,
                max_tokens: 50,  // Adjust as needed
            }),
        });

        if (!response.ok) {
            return {
                statusCode: response.status,
                body: response.statusText,
            };
        }

        const data = await response.json();
        return {
            statusCode: 200,
            body: JSON.stringify({ suggestions: data.choices[0].text }),
        };
    } catch (error) {
        console.error('Error fetching suggestions:', error);
        return {
            statusCode: 500,
            body: 'Internal Server Error',
        };
    }
};
