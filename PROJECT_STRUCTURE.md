# SHEDOW AI Project - Directory Reference

## 📁 Full Project Structure

```
shadow-ai-ecosystem/  (Your Main Project)
│
├── 📱 ANDROID APP
│   ├── android/
│   │   ├── app/
│   │   │   ├── src/main/java/com/shedow/ai/
│   │   │   │   ├── MainActivity.kt              ← Main app UI
│   │   │   │   ├── core/
│   │   │   │   │   └── AIOrchestrator.kt        ← Brain (route plugin→offline→cloud)
│   │   │   │   ├── voice/
│   │   │   │   │   ├── WakeWordService.kt       ← "Hey SHEDOW" detection
│   │   │   │   │   └── VoiceService.kt          ← Continuous listening
│   │   │   │   ├── ai/
│   │   │   │   │   ├── OfflineLLM.kt            ← Local AI (no internet)
│   │   │   │   │   └── CloudAI.kt               ← OpenAI GPT-4o
│   │   │   │   ├── tts/
│   │   │   │   │   └── TTS.kt                   ← Voice output (Jarvis voice)
│   │   │   │   └── memory/
│   │   │   │       └── MemoryDB.kt              ← Room database (conversation history)
│   │   │   ├── AndroidManifest.xml              ← App permissions & manifest
│   │   │   └── res/                             ← Resources (strings, colors)
│   │   ├── build.gradle                         ← Dependencies (Compose, Retrofit, etc)
│   │   └── proguard-rules.pro                   ← Code shrinking rules
│   ├── settings.gradle
│   └── build.gradle
│
├── ☁️ BACKEND API
│   ├── backend/
│   │   ├── server.js                   ← Main Express.js server
│   │   ├── package.json                ← Node dependencies
│   │   ├── .env.example                ← Configuration template
│   │   ├── Dockerfile                  ← Docker container config
│   │   └── docker-compose.yml          ← Multi-container setup (optional)
│
├── 🚀 BUILD & DEPLOYMENT
│   ├── deploy/
│   │   ├── build-apk.sh                ← Build debug APK (./gradlew assembleDebug)
│   │   ├── build-aab.sh                ← Build release for Play Store (./gradlew bundleRelease)
│   │   ├── deploy-backend.sh           ← Deploy backend to Docker
│   │   ├── sign-apk.sh                 ← Sign APK for production
│   │   └── generate-zip.sh             ← Create downloadable ZIP
│
├── 🏪 GOOGLE PLAY STORE
│   ├── playstore/
│   │   ├── app-description.txt         ← 4000 char store description
│   │   ├── privacy-policy.md           ← GDPR compliant privacy policy
│   │   ├── release-notes.txt           ← v1.0.0 release notes
│   │   └── screenshots/                ← Store screenshots (1080x1920)
│
├── 📚 DOCUMENTATION
│   ├── docs/
│   │   ├── full-setup-guide.md         ← Complete architecture guide
│   │   ├── api.md                      ← Backend API endpoints
│   │   ├── security.md                 ← Security best practices
│   │   └── setup.sh                    ← Setup verification script
│
├── 📖 MAIN DOCUMENTATION
│   ├── GETTING_STARTED.md              ← ⭐ START HERE! Quick overview
│   ├── COMPLETE_SETUP_GUIDE.md         ← Full detailed instructions
│   ├── QUICKSTART.sh                   ← Quick reference menu
│   ├── README.md                       ← Project overview
│   └── PROJECT_STRUCTURE.md            ← This file
│
└── 🔒 SECURITY & CONFIG
    ├── .env.example                    ← API key template
    ├── .gitignore                      ← Don't commit API keys!
    └── release.keystore                ← Android signing key (create once)
```

## 🎯 KEY FILES YOU'LL USE

### Daily Development
```
android/app/src/main/java/com/shedow/ai/    - Edit features here
backend/server.js                           - Edit API here
```

### Building & Testing
```
deploy/build-apk.sh          - Build for phone testing
deploy/build-aab.sh          - Build for Play Store
Deploy/deploy-backend.sh     - Deploy backend
```

### Configuration
```
backend/.env                 - Set OPENAI_API_KEY here
android/.../WakeWordService  - Set Porcupine key here
```

### Documentation
```
GETTING_STARTED.md           - Read this first!
COMPLETE_SETUP_GUIDE.md      - Detailed walkthrough
```

## 📊 File Size Guide

```
android/               ~500 MB (with gradle cache)
backend/               ~200 MB (node_modules)
docs/                  ~1 MB
Deploy APK            ~50 MB (compressed)
Total project:        ~700 MB (development)
Final APK:             ~50 MB (for phones)
Docker image:          ~300 MB
```

## 🔄 Development Workflow

```
1. Edit android/ code
   ↓
2. Click Run in Android Studio
   ↓
3. Test on emulator/phone
   ↓
4. If backend needed, edit backend/server.js
   ↓
5. npm start (in backend/)
   ↓
6. Test app with backend
   ↓
7. When ready: bash deploy/build-aab.sh
   ↓
8. Upload to Play Store
```

## 📱 Android Project Structure Explained

### MainActivity.kt
- Jetpack Compose UI
- Shows logo, mic button, responses
- Starts voice services
- Beautiful dark theme

### AIOrchestrator.kt
- Brain of the app
- Decides: Plugin → Offline → Cloud
- Stores in memory
- Priority routing

### WakeWordService.kt
- Listens for "Hey SHEDOW"
- Uses Porcupine SDK
- <100ms detection
- Wakes up the app

### VoiceService.kt
- Continuous voice listener
- Converts speech to text
- Sends to orchestrator
- Plays TTS response

### OfflineLLM.kt
- Local AI (no internet)
- Rules-based responses
- Time, greetings, math
- Upgrade: Phi-3, Mistral

### CloudAI.kt
- OpenAI integration
- GPT-4o responses
- Fallback for complex queries
- Requires API key

### TTS.kt
- Text-to-Speech
- Jarvis voice (pitch 0.85)
- Speaks app responses
- Android native

### MemoryDB.kt
- Room database
- Stores conversation history
- Supports memory learning
- SQLite encrypted

### AndroidManifest.xml
- App permissions
- Microphone, internet, phone
- Foreground services
- Intent filters

## ☁️ Backend Structure Explained

### server.js
- Express.js main file
- 3 routes: /health, /ai, /
- OpenAI integration
- Error handling

### package.json
- Dependencies: express, axios, cors, dotenv
- Scripts: start, dev
- Version tracking

### .env
- OPENAI_API_KEY (secret!)
- PORT (3000)
- NODE_ENV (production)

### Dockerfile
- Node 18 alpine image
- Lightweight container
- Health checks
- Port 3000 exposed

## 🚀 Deployment Files

### build-apk.sh
- Cleans previous builds
- Runs ./gradlew assembleDebug
- Creates debug APK for testing

### build-aab.sh
- Builds release bundle
- Optimized for Play Store
- Smaller download size

### deploy-backend.sh
- Builds Docker image
- Runs container on :3000
- Sets environment variables

### sign-apk.sh
- Signs with keystore
- Production-ready APK
- For Play Store upload

## 📚 Documentation Files

### GETTING_STARTED.md
- Quick overview
- What you have
- 3 paths to choose
- 5-minute test

### COMPLETE_SETUP_GUIDE.md
- Step-by-step instructions
- Backend setup (local/docker/cloud)
- Android build process
- Play Store launch
- Troubleshooting

### full-setup-guide.md
- Architecture diagrams
- Component explanations
- Deployment strategies
- Security practices
- Success metrics

### api.md
- Backend endpoints
- Request/response format
- Error codes
- Usage examples

### security.md
- Data privacy
- Permission security
- API key management
- Backend hardening
- Compliance (GDPR, CCPA)

## 💾 Configuration Files

### .env.example → .env
```
OPENAI_API_KEY=sk-your-key
PORT=3000
NODE_ENV=production
```

### WakeWordService.kt
```kotlin
.setAccessKey("YOUR_PORCUPINE_ACCESS_KEY")
```

### .gitignore
```
.env
release.keystore
node_modules/
.gradle/
```

## 🎯 What Each Folder Does

| Folder | Purpose | Edit | Run |
|--------|---------|------|-----|
| android/ | Mobile app | YES | Android Studio |
| backend/ | API server | YES | npm start |
| deploy/ | Build scripts | NO | bash script.sh |
| playstore/ | Store assets | YES | Upload |
| docs/ | Documentation | Read | - |

## 🔐 Security Files

```
.env              ← Contains OPENAI_API_KEY (NEVER commit!)
release.keystore  ← Android signing key (keep safe!)
```

## 📊 Size Expectations

```
App Download Size:     ~50 MB
Backend Memory:        ~100 MB
Database Size:         ~10 MB (per user)
Docker Image:          ~300 MB
Gradle Cache:          ~5 GB (first build)
```

## 🎓 Learning Path

1. **First**: Read GETTING_STARTED.md (5 min)
2. **Then**: Read COMPLETE_SETUP_GUIDE.md (20 min)
3. **Now**: Choose your path (test/develop/deploy)
4. **Execute**: Follow step-by-step instructions
5. **Learn**: Check docs/ for deeper understanding

---

**You have everything. Now let's build! 🚀**
