//old configuration

equire('dotenv').config();
const axios = require('axios');

// Get your OpenAI API key from the environment variable
const apiKey = process.env.OPENAI_API_KEY;

async function getOpenAIResponse(prompt) {
    const url = 'https://api.openai.com/v1/chat/completions';

    try {
        const response = await axios.post(url, {
            model: 'gpt-3.5-turbo', // or another model like 'gpt-4'
            messages: [{ role: 'user', content: prompt }],
        }, {
            headers: {
                'Authorization': `Bearer ${apiKey}`,
                'Content-Type': 'application/json',
            },
        });

        return response.data.choices[0].message.content;
    } catch (error) {
        console.error('Error fetching from OpenAI:', error.response ? error.response.data : error.message);
    }
}

// Example usage
const prompt = 'What is the capital of France?';
getOpenAIResponse(prompt).then(response => {
    console.log('OpenAI Response:', response);
});