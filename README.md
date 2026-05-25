# 🌙 Shadow AI Ecosystem

A sophisticated offline-first AI assistant ecosystem with intelligent cloud fallback, plugin system, and persistent memory graph.

## Architecture Overview

```
shadow-ai-ecosystem/
├── apps/
│   ├── mobile-android/        (Jarvis assistant APK)
│   └── web-dashboard/         (control panel)
├── core/
│   ├── ai-engine/             (brain logic)
│   ├── intent-router/         (command understanding)
│   ├── memory-graph/          (long-term memory)
│   └── plugin-system/         (skills framework)
├── services/
│   ├── cloud-api/             (Node.js / FastAPI)
│   ├── auth-service/          (users)
│   └── ai-orchestrator/      (offline + cloud switching)
├── models/
│   ├── mistral-quantized/
│   └── phi3-mobile/
├── sdk/
│   ├── android-sdk/
│   └── js-sdk/
├── docs/
│   ├── architecture.md
│   ├── api.md
│   └── plugin-guide.md
└── deploy/
    ├── docker/
    └── kubernetes/
```

## Key Features

✅ **Offline-First Design** - Works without internet
✅ **Intelligent Fallback** - Seamlessly switches to cloud when needed
✅ **Plugin System** - Extensible skills framework (WhatsApp, SMS, etc.)
✅ **Memory Graph** - Personality, learning, and prediction
✅ **On-Device LLMs** - Mistral 7B & Phi-3 Mini quantized
✅ **Cloud Scaling** - OpenAI GPT-4o integration
✅ **Cross-Platform** - Android, Web, API

## Quick Start

### Prerequisites
- Kotlin 1.9+
- Node.js 18+
- Python 3.10+
- Docker & Docker Compose
- Android Studio (for mobile)

### Setup

1. Clone repository:
```bash
git clone https://github.com/wwwkmgayansagara96-cell/shadow-ai-ecosystem.git
cd shadow-ai-ecosystem
```

2. Install dependencies:
```bash
# Backend
cd services/cloud-api
npm install

# Python services
cd ../auth-service
pip install -r requirements.txt
```

3. Configure environment:
```bash
cp .env.example .env
# Edit .env with your OpenAI API key and settings
```

4. Run with Docker Compose:
```bash
docker-compose up -d
```

## Documentation

- [Architecture Guide](docs/architecture.md)
- [API Reference](docs/api.md)
- [Plugin Development Guide](docs/plugin-guide.md)

## License

MIT
