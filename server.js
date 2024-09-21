const path = require('path');
const express = require('express');
const axios = require('axios');

const app = express();
app.use(express.json());

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log('Server is running on http://localhost:${PORT}');
});

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, 'public')));

// Example root route, serves your index.html
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

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