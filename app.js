// Import required modules
const { Configuration, OpenAIApi } = require('openai');
require('dotenv').config();

// Initialize OpenAI API configuration
const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

// Function to make a request to OpenAI API
async function generateResponse(prompt) {
  try {
    const response = await openai.createCompletion({
      model: 'gpt-4',  // Updated to GPT-4 model
      prompt: prompt,
      max_tokens: 150,
    });

    console.log('Response:', response.data.choices[0].text.trim());
  } catch (error) {
    console.error('Error:', error.response ? error.response.data : error.message);
  }
}

// Example prompt to test
const prompt = 'Tell me a joke about artificial intelligence';
generateResponse(prompt);