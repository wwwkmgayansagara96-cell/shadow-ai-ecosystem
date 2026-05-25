#!/bin/bash

echo "🚀 Deploying SHEDOW AI Backend..."

# Build Docker image
echo "🐳 Building Docker image..."
docker build -t shedow-ai-backend:latest .

if [ $? -ne 0 ]; then
    echo "❌ Docker build failed!"
    exit 1
fi

echo "✅ Docker image built successfully"

# Run container
echo "▶️  Starting SHEDOW AI backend container..."
docker run -p 3000:3000 \
  -e OPENAI_API_KEY="$OPENAI_API_KEY" \
  -e JWT_SECRET="$JWT_SECRET" \
  -e NODE_ENV="production" \
  -d \
  --name shedow-ai-backend \
  shedow-ai-backend:latest

if [ $? -eq 0 ]; then
    echo "✅ Backend deployed successfully!"
    echo "🌐 API running at http://localhost:3000"
    echo "📊 Health check: http://localhost:3000/health"
else
    echo "❌ Failed to start container!"
    exit 1
fi
