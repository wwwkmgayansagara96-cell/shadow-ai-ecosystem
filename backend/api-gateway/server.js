const express = require('express');
const axios = require('axios');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const app = express();
app.use(express.json());

const PORT = process.env.PORT || 3000;
const OPENAI_API_KEY = process.env.OPENAI_API_KEY;
const JWT_SECRET = process.env.JWT_SECRET;

// ============================================
// MIDDLEWARE
// ============================================

// Authentication middleware
const auth = (req, res, next) => {
  const token = req.headers['authorization']?.split(' ')[1];
  
  if (!token) {
    return res.status(401).json({ error: 'UNAUTHORIZED', message: 'Missing token' });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    res.status(401).json({ error: 'UNAUTHORIZED', message: 'Invalid token' });
  }
};

// ============================================
// AUTH ENDPOINTS
// ============================================

app.post('/auth/login', async (req, res) => {
  const { email, password } = req.body;
  
  try {
    // Validate credentials (implement actual auth logic)
    const user = { id: '123', email, role: 'user' };
    const token = jwt.sign(user, JWT_SECRET, { expiresIn: '7d' });
    
    res.json({ token, user });
  } catch (error) {
    res.status(500).json({ error: 'LOGIN_FAILED', message: error.message });
  }
});

app.post('/auth/signup', async (req, res) => {
  const { email, password, username } = req.body;
  
  try {
    // Create user (implement actual signup logic)
    const user = { id: '123', email, username, role: 'user' };
    const token = jwt.sign(user, JWT_SECRET, { expiresIn: '7d' });
    
    res.status(201).json({ token, user });
  } catch (error) {
    res.status(500).json({ error: 'SIGNUP_FAILED', message: error.message });
  }
});

// ============================================
// AI ENDPOINTS
// ============================================

app.post('/ai/process', auth, async (req, res) => {
  const { input, context } = req.body;
  const startTime = Date.now();
  
  if (!input) {
    return res.status(400).json({ error: 'INVALID_INPUT', message: 'Input required' });
  }

  try {
    // 1. Try plugin check (would call orchestrator service)
    // 2. Try offline AI (would call local model)
    // 3. Fall back to cloud AI
    
    const response = await axios.post('https://api.openai.com/v1/chat/completions', {
      model: 'gpt-4o-mini',
      messages: [{ role: 'user', content: input }],
      temperature: 0.7
    }, {
      headers: { 'Authorization': `Bearer ${OPENAI_API_KEY}` }
    });

    const output = response.data.choices[0].message.content;
    const processingTime = Date.now() - startTime;

    res.json({
      output,
      source: 'cloud',
      processingTime,
      memoryStored: true,
      conversationId: `conv_${Date.now()}`
    });
  } catch (error) {
    console.error('AI Processing Error:', error);
    res.status(500).json({ 
      error: 'AI_PROCESS_FAILED',
      message: error.message,
      requestId: `req_${Date.now()}`
    });
  }
});

app.get('/ai/memory/:conversationId', auth, async (req, res) => {
  const { conversationId } = req.params;
  
  try {
    // Fetch from memory service
    const memory = {
      conversationId,
      nodes: [],
      connections: []
    };
    
    res.json(memory);
  } catch (error) {
    res.status(500).json({ error: 'MEMORY_FETCH_FAILED' });
  }
});

// ============================================
// PLUGIN ENDPOINTS
// ============================================

app.get('/plugins', auth, async (req, res) => {
  try {
    const plugins = [
      {
        id: 'whatsapp',
        name: 'WhatsApp',
        version: '1.0.0',
        enabled: true,
        keywords: ['whatsapp', 'message', 'send']
      },
      {
        id: 'time',
        name: 'Time & Clock',
        version: '1.0.0',
        enabled: true,
        keywords: ['time', 'date', 'clock', 'hour']
      },
      {
        id: 'greeting',
        name: 'Greeting Skill',
        version: '1.0.0',
        enabled: true,
        keywords: ['hello', 'hi', 'hey', 'greet']
      }
    ];
    
    res.json({ plugins });
  } catch (error) {
    res.status(500).json({ error: 'FETCH_PLUGINS_FAILED' });
  }
});

app.post('/plugins/install', auth, async (req, res) => {
  const { pluginId, url } = req.body;
  
  try {
    // Download and install plugin
    res.json({
      success: true,
      pluginId,
      message: 'Plugin installed successfully'
    });
  } catch (error) {
    res.status(500).json({ error: 'INSTALL_FAILED' });
  }
});

// ============================================
// USER ENDPOINTS
// ============================================

app.get('/user/profile', auth, async (req, res) => {
  try {
    const profile = {
      userId: req.user.id,
      username: 'john_doe',
      email: req.user.email,
      preferences: {
        preferOffline: false,
        language: 'en-US',
        ttsVoice: 'jarvis',
        ttsPitch: 0.85
      },
      subscriptionTier: 'pro',
      createdAt: new Date().toISOString()
    };
    
    res.json(profile);
  } catch (error) {
    res.status(500).json({ error: 'FETCH_PROFILE_FAILED' });
  }
});

app.put('/user/preferences', auth, async (req, res) => {
  const { preferOffline, language, ttsPitch } = req.body;
  
  try {
    // Update preferences in database
    res.json({
      success: true,
      preferences: { preferOffline, language, ttsPitch }
    });
  } catch (error) {
    res.status(500).json({ error: 'UPDATE_FAILED' });
  }
});

// ============================================
// HEALTH CHECK
// ============================================

app.get('/health', (req, res) => {
  res.json({ status: 'healthy', timestamp: new Date().toISOString() });
});

// ============================================
// SERVER START
// ============================================

app.listen(PORT, () => {
  console.log(`🚀 SHEDOW AI Backend running on port ${PORT}`);
  console.log(`📡 API Gateway: http://localhost:${PORT}`);
  console.log(`🔧 Environment: ${process.env.NODE_ENV || 'development'}`);
});

module.exports = app;
