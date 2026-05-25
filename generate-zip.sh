#!/bin/bash

echo "📦 Generating SHEDOW AI Full Project ZIP..."

# Create directories
mkdir -p shedow-ai-launch/{android,backend,deploy,playstore,docs,offline-ai}

# Copy Android files
cp -r android/* shedow-ai-launch/android/

# Copy Backend files
cp -r backend/* shedow-ai-launch/backend/

# Copy Deploy scripts
cp -r deploy/* shedow-ai-launch/deploy/

# Copy Play Store assets
cp -r playstore/* shedow-ai-launch/playstore/

# Copy Docs
cp -r docs/* shedow-ai-launch/docs/

# Create README
cat > shedow-ai-launch/README.md << 'EOF'
# 🤖 SHEDOW AI - Full Startup Launch Package

**Production-ready AI voice assistant ecosystem**

## 📦 What's Included

✅ Complete Android app (Kotlin)
✅ Backend API (Node.js)
✅ Offline AI engine
✅ Cloud AI integration (OpenAI)
✅ Build & deployment scripts
✅ Play Store submission kit
✅ Full documentation
✅ Privacy policy & legal docs

## 🚀 Quick Start

### 1. Android App
```bash
cd android
./gradlew build
```

### 2. Backend
```bash
cd backend
npm install
OPENAI_API_KEY=sk-xxx npm start
```

### 3. Build APK
```bash
bash deploy/build-apk.sh
```

### 4. Release for Play Store
```bash
bash deploy/build-aab.sh
```

## 📱 Play Store Launch

See `playstore/` folder for:
- App description
- Privacy policy
- Release notes
- Screenshot guidelines

## 📖 Documentation

- [Full Setup Guide](docs/full-setup-guide.md)
- [Architecture](docs/architecture.md)
- [API Reference](docs/api.md)
- [Security](docs/security.md)

## 🔧 Configuration

1. Get Porcupine access key: https://console.picovoice.ai/
2. Get OpenAI API key: https://platform.openai.com/api-keys
3. Update keys in code

## 📞 Support

support@shedow.ai

## 📜 License

MIT
EOF

# Create ZIP
zip -r shedow-ai-launch.zip shedow-ai-launch/

echo "✅ Done!"
echo "📦 Created: shedow-ai-launch.zip"
echo "📱 Size: $(du -sh shedow-ai-launch.zip | cut -f1)"
echo ""
echo "📋 Next steps:"
echo "   1. Extract ZIP"
echo "   2. Update API keys"
echo "   3. Run build scripts"
echo "   4. Test on Android device"
echo "   5. Submit to Play Store"
