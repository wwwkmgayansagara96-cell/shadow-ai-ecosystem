# 🌙 SHEDOW API Reference

## Cloud AI Endpoint

### POST /api/ai

Send a message to the cloud AI for processing.

**Request:**
```json
{
  "message": "What is the weather?",
  "context": ["User asked about weather", "Location: New York"],
  "userId": "user_123"
}
```

**Response:**
```json
{
  "success": true,
  "reply": "I need to check the weather API. Currently, it's sunny in New York with 72°F.",
  "timestamp": "2024-01-15T10:30:00Z",
  "model": "gpt-4o-mini"
}
```

**Status Codes:**
- 200: Success
- 400: Bad request (missing message)
- 500: Server error

---

### GET /api/health

Check cloud AI service status.

**Response:**
```json
{
  "status": "ok",
  "service": "cloud-ai",
  "model": "gpt-4o-mini",
  "timestamp": "2024-01-15T10:30:00Z"
}
```

---

## Authentication Service

### POST /register

Register a new user.

**Request:**
```json
{
  "username": "john_doe",
  "email": "john@example.com",
  "password": "secure_password"
}
```

**Response:**
```json
{
  "access_token": "eyJhbGc...",
  "token_type": "bearer",
  "user_id": "user_123"
}
```

---

### POST /login

Login user.

**Request:**
```json
{
  "username": "john_doe",
  "password": "secure_password"
}
```

**Response:**
```json
{
  "access_token": "eyJhbGc...",
  "token_type": "bearer",
  "user_id": "user_123"
}
```

---

### GET /verify

Verify JWT token.

**Query Parameters:**
- `token` (string): JWT token

**Response:**
```json
{
  "valid": true,
  "user_id": "user_123",
  "exp": 1705315800
}
```

---

## Android SDK

### Initialize Orchestrator

```kotlin
val orchestrator = ShedowOrchestrator(
  offline = OfflineEngine("./models/mistral-7b-q4.gguf"),
  cloud = CloudAI("http://cloud-api:3000"),
  plugins = PluginManager().apply {
    register(WhatsAppPlugin())
    register(TimePlugin())
    register(GreetingPlugin())
  },
  memory = MemoryGraph()
)
```

### Handle User Input

```kotlin
val response = orchestrator.handle("What time is it?")
println(response) // "The current time is 10:30:45"
```

### Get Memory Context

```kotlin
val context = orchestrator.memory.getContext("weather")
println(context) // List of recent weather-related responses
```

---

## Error Handling

### Cloud API Unavailable

When cloud is down, the orchestrator falls back to offline engine:

```
User: "Who won the NBA finals 2024?"
▼
Plugin: No match
▼
Offline: "NEEDS_CLOUD"
▼
Cloud: ERROR (Timeout/Unavailable)
▼
Response: "I'm offline and need internet to answer that. Try again when connected."
```

### Invalid Input

```json
{
  "success": false,
  "error": "Message is required"
}
```

### Rate Limiting

```json
{
  "success": false,
  "error": "Rate limit exceeded. Max 60 requests per minute."
}
```
