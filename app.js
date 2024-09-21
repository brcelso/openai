// Import required modules
const OpenAI = require('openai');
require('dotenv').config();

// Initialize OpenAI API with your API key
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// Function to make a request to OpenAI API
async function generateResponse(prompt) {
  try {
    const response = await openai.chat.completions.create({
      model: 'gpt-4',  // GPT-4 model
      messages: [{ role: 'user', content: prompt }],
      max_tokens: 150,
    });

    console.log('Response:', response.choices[0].message.content.trim());
  } catch (error) {
    console.error('Error:', error.response ? error.response.data : error.message);
  }
}

// Example prompt to test
const prompt = 'Tell me a joke about artificial intelligence';
generateResponse(prompt);