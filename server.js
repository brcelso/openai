const express = require('express');
const axios = require('axios');

const app = express();
app.use(express.json());

const apiKey = process.env.OPENAI_API_KEY;

app.post('/api/openai', async (req, res) => {
    const prompt = req.body.prompt;
    try {
        const response = await axios.post('https://api.openai.com/v1/chat/completions', {
            model: 'gpt-3.5-turbo',
            messages: [{ role: 'user', content: prompt }],
        }, {
            headers: {
                'Authorization': `Bearer ${apiKey}`,
                'Content-Type': 'application/json',
            },
        });
        res.json({ response: response.data.choices[0].message.content });
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch from OpenAI' });
    }
});

module.exports = app;