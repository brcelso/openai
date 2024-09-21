require('dotenv').config();
const axios = require('axios');

const apiKey = process.env.OPENAI_API_KEY;

const fetchOpenAIResponse = async (prompt) => {
  try {
    const response = await axios.post(
      'https://api.openai.com/v1/chat/completions',
      {
        model: 'gpt-3.5-turbo',
        messages: [{ role: 'user', content: prompt }]
      },
      {
        headers: {
          'Authorization': `Bearer ${apiKey}`,
          'Content-Type': 'application/json'
        }
      }
    );
    console.log(response.data.choices[0].message.content);
  } catch (error) {
    console.error('Error fetching response:', error);
  }
};

fetchOpenAIResponse('Hello, how can I use the OpenAI API?');