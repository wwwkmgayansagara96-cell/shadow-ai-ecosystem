#!/bin/bash

set -e

echo "☁️ Deploying SHEDOW AI Backend..."

cd backend

echo "📦 Building Docker image..."
docker build -t shedow-ai-backend:latest .

echo "🚀 Starting container..."
docker run -d \
  -p 3000:3000 \
  -e OPENAI_API_KEY="${OPENAI_API_KEY}" \
  -e NODE_ENV=production \
  --name shedow-ai-backend \
  shedow-ai-backend:latest

echo "✅ Backend deployed!"
echo "🌐 API: http://localhost:3000"
echo "💚 Health: http://localhost:3000/health"
