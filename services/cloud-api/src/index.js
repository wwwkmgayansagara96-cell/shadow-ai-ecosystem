const express = require('express');
const { Configuration, OpenAIApi } = require('openai');
require('dotenv').config();

const app = express();
app.use(express.json());

// Initialize OpenAI
const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

/**
 * ☁️ CLOUD AI ENDPOINT
 * 
 * Handles requests that need powerful AI reasoning
 * Falls back from offline/plugins to this
 */
app.post('/api/ai', async (req, res) => {
  try {
    const { message, context = [], userId = 'anonymous' } = req.body;

    if (!message) {
      return res.status(400).json({ error: 'Message is required' });
    }

    // Build system prompt with context
    const systemPrompt = buildSystemPrompt(context);

    // Call OpenAI
    const response = await openai.createChatCompletion({
      model: process.env.OPENAI_MODEL || 'gpt-4o-mini',
      messages: [
        {
          role: 'system',
          content: systemPrompt
        },
        {
          role: 'user',
          content: message
        }
      ],
      temperature: 0.7,
      max_tokens: 500,
    });

    const reply = response.data.choices[0].message.content;

    // Log for memory graph
    console.log(`[${userId}] Q: ${message}`);
    console.log(`[${userId}] A: ${reply}`);

    res.json({
      success: true,
      reply: reply,
      timestamp: new Date(),
      model: process.env.OPENAI_MODEL
    });

  } catch (error) {
    console.error('Cloud AI Error:', error);
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

/**
 * Health check endpoint
 */
app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    service: 'cloud-ai',
    model: process.env.OPENAI_MODEL,
    timestamp: new Date()
  });
});

/**
 * Build system prompt with context from memory graph
 */
function buildSystemPrompt(context) {
  let prompt = `You are SHEDOW, a personal AI assistant.

You are:
- Helpful, harmless, and honest
- Running offline when possible, cloud-powered for complex tasks
- Integrated with plugins for device control
- Learning from user interactions

User Context (recent interactions):`;

  if (context && context.length > 0) {
    context.forEach((item, idx) => {
      prompt += `\n${idx + 1}. ${item}`;
    });
  } else {
    prompt += '\n(New conversation)';
  }

  return prompt;
}

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🌙 SHEDOW Cloud AI running on port ${PORT}`);
  console.log(`OpenAI Model: ${process.env.OPENAI_MODEL}`);
});

module.exports = app;
