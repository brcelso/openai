require('dotenv').config();
const express = require('express');
const axios = require('axios');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

const apiKey = process.env.OPENAI_API_KEY;

// Middleware to parse JSON
app.use(express.json());

// Serve static files from the public directory (for HTML, CSS, JS)
app.use(express.static(path.join(__dirname, 'public')));

// API route to handle OpenAI requests
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
        console.error('Error fetching from OpenAI:', error.response ? error.response.data : error.message);
        res.status(500).json({ error: 'Failed to fetch from OpenAI' });
    }
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});