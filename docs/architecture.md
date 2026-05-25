# 🌙 SHEDOW Architecture

## System Design

```
┌──────────────────────────────────────────────┐
│         Android App (Jarvis)            │
│  ┌────────────────────────────────────────┐  │
│  │    UI Layer (Jetpack Compose)    │  │
│  └────────────────────────────────────────┘  │
└──────────────────────────┬──────────────────┘
               │
               ▼
┌────────────────────────────────────────────────┐
│      SHEDOW ORCHESTRATOR (Core)          │
│  ┌────────────────────────────────────────┐   │
│  │  1. Plugin Manager (Fastest)     │   │
│  │  2. Offline Engine (Fast)        │   │
│  │  3. Cloud AI (Powerful)          │   │
│  └────────────────────────────────────────┘   │
└──────────────────────┬──────────────────────┘
               │
       ┌───────┼───────────┬────────────────┐
       ▼       ▼       ▼
   ┌────────┐ ┌────────┐  ┌──────────────────┐
   │MemGraph │ │ Plugins   │  │  Offline     │
   │        │ │        │  │  Engine        │
   └────────┘ └────────┘  └──────────────────┘
       │
       └──────────────────┬────────────────────┘
                     ▼              ▼
              ┌────────────────────────┐   ┌──────────────────┐
              │  Cloud API  │   │Auth Service  │
              └────────────────────┘   └──────────────────┘
                    │
                    ▼
              ┌──────────────────┐
              │ OpenAI GPT       │
              │ MongoDB          │
              │ Redis            │
              └──────────────────┘
```

## Component Details

### 1. Plugin System
- **Purpose**: Device-level commands (WhatsApp, SMS, settings, etc.)
- **Execution**: Synchronous, instant
- **Plugins**: Implement `ShedowPlugin` interface
- **Priority**: Can be prioritized
- **Examples**:
  - WhatsAppPlugin - Send messages
  - TimePlugin - Get time/set alarms
  - GreetingPlugin - Basic responses
  - ContactsPlugin - Search contacts
  - SettingsPlugin - Device settings

### 2. Offline Engine
- **Purpose**: Local AI without internet
- **Models**: Mistral 7B, Phi-3 Mini (quantized GGUF)
- **Runtime**: llama.cpp for Android
- **Features**:
  - Time/date queries
  - Basic math
  - Static knowledge
  - Fallback text patterns
- **Confidence**: High for known patterns, flags unknown for cloud

### 3. Memory Graph
- **Purpose**: User learning, context, personality
- **Data Structure**: Nodes + Edges
- **Node Info**:
  - Input text
  - Response text
  - Timestamp
  - Context tags
  - Importance score
  - Source (plugin/offline/cloud)
- **Features**:
  - Context retrieval
  - Tag-based search
  - Relationship tracking
  - Auto-cleanup (30-day retention)

### 4. Cloud AI
- **Purpose**: Complex reasoning, knowledge
- **Model**: OpenAI GPT-4o-mini
- **Latency**: ~1-5 seconds
- **Fallback**: When offline can't handle
- **Context**: Sent from memory graph

### 5. Authentication Service
- **Purpose**: User management
- **Auth**: JWT tokens
- **DB**: MongoDB
- **Features**:
  - Register/Login
  - Token verification
  - Multi-device support

## Data Flow

```
User Input
    ▼
Orchestrator.handle(input)
    ▼
1. Store in MemoryGraph
    ▼
2. Try Plugins.findMatch()
    ├─ Found? → Plugin.execute() → Return
    └─ Not found? Continue
    ▼
3. Try OfflineEngine.respond()
    ├─ Strong response? → Store + Return
    └─ NEEDS_CLOUD? Continue
    ▼
4. CloudAI.ask()
    ├─ Success? → Store + Return
    └─ Error? → Error handling
```

## Key Features

### Offline-First
- Works completely without internet
- Local storage and processing
- Graceful degradation

### Intelligent Fallback
- Plugins first (instant)
- Offline AI second (fast)
- Cloud AI last (powerful)
- No user waiting for cloud if offline works

### Learning System
- Memory graph tracks all interactions
- Tags enable context retrieval
- Importance scoring for prioritization
- User personality modeling

### Extensible
- Plugin system for new skills
- Model swapping (different LLMs)
- Service modularity

## Scalability

- **Device**: Off-device processing reduces latency
- **Cloud**: Horizontal scaling with microservices
- **Data**: MongoDB for scalable storage
- **Cache**: Redis for session/rate limiting
- **Orchestration**: Kubernetes-ready

## Security

- JWT authentication
- API rate limiting
- Input validation
- Secure offline storage
- Encrypted cloud communication
