const express = require('express');
const axios = require('axios');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(express.json());
app.use(cors());

const PORT = process.env.PORT || 3000;
const OPENAI_API_KEY = process.env.OPENAI_API_KEY;

if (!OPENAI_API_KEY) {
  console.error('❌ OPENAI_API_KEY not set');
  process.exit(1);
}

/**
 * ☁️ CLOUD AI BACKEND
 * OpenAI GPT-4o integration
 */

app.post('/ai', async (req, res) => {
  const { message } = req.body;

  if (!message) {
    return res.status(400).json({ error: 'Message required' });
  }

  try {
    const response = await axios.post(
      'https://api.openai.com/v1/chat/completions',
      {
        model: 'gpt-4o-mini',
        messages: [{ role: 'user', content: message }],
        temperature: 0.7,
      },
      {
        headers: {
          'Authorization': `Bearer ${OPENAI_API_KEY}`,
          'Content-Type': 'application/json',
        },
      }
    );

    const reply = response.data.choices[0].message.content;

    res.json({
      success: true,
      reply,
      model: 'gpt-4o-mini',
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error('❌ OpenAI API Error:', error.response?.data || error.message);
    res.status(500).json({
      error: 'Failed to process request',
      message: error.message,
    });
  }
});

app.get('/health', (req, res) => {
  res.json({ status: 'healthy', timestamp: new Date().toISOString() });
});

app.listen(PORT, () => {
  console.log(`🚀 SHEDOW AI Backend running on port ${PORT}`);
  console.log(`🔗 API: http://localhost:${PORT}/ai`);
  console.log(`💚 Health: http://localhost:${PORT}/health`);
});

module.exports = app;
