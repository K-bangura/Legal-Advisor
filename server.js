require('dotenv').config();
const express = require('express');
const cors = require('cors');
const axios = require('axios');

const app = express();
const PORT = 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Root route for testing
app.get('/', (req, res) => {
    res.send('Legal Advisor Chatbot Server is running');
});

// Chatbot response route
app.post('/chat', async (req, res) => {
    const userMessage = req.body.message;

    try {
        // Send request to OpenAI API
        const response = await axios.post(
            'https://api.openai.com/v1/completions',
            {
                model: "text-davinci-003",
                prompt: `You are a legal advisor. Respond to the following question: "${userMessage}"`,
                max_tokens: 150,
                temperature: 0.5
            },
            {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`
                }
            }
        );

        // Send chatbot response back to client
        const botResponse = response.data.choices[0].text.trim();
        res.json({ response: botResponse });
    } catch (error) {
        console.error('Error generating response:', error.message);
        res.status(500).json({ error: 'An error occurred while generating the response.' });
    }
});

// Start server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
