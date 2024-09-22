// Import required modules
const OpenAI = require('openai');
require('dotenv').config();

// Initialize OpenAI API with your API key
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,  // Make sure your OpenAI API key is correctly set up
});

// Function to make a request to GPT-4 using Chat Completions API
async function generateResponse(prompt) {
  try {
    const response = await openai.chat.completions.create({
      model: 'gpt-4',  // This is where you specify GPT-4
      messages: [{ role: 'user', content: prompt }],  // Proper chat format with role and content
      max_tokens: 150,  // Set token limit based on your needs
    });

    // Log the model being used and the response
    console.log('Model used:', response.model);
    console.log('Response:', response.choices[0].message.content.trim());
  } catch (error) {
    console.error('Error:', error.response ? error.response.data : error.message);
  }
}

// Example prompt to test
const prompt = 'Tell me a joke about artificial intelligence';
generateResponse(prompt);