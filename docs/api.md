# SHEDOW AI - API Documentation

## Backend Endpoints

### Health Check
```
GET /health

Response:
{
  "status": "healthy",
  "timestamp": "2024-01-10T12:00:00Z"
}
```

### Process AI Request
```
POST /ai

Request Body:
{
  "message": "What time is it?"
}

Response:
{
  "success": true,
  "reply": "It is 12:00 PM",
  "model": "gpt-4o-mini",
  "timestamp": "2024-01-10T12:00:00Z"
}
```

## Android API Usage

### Initialize AI Orchestrator
```kotlin
val orchestrator = AIOrchestrator(
    offline = OfflineLLM(),
    cloud = CloudAI(apiKey),
    memory = MemoryDB(dao)
)
```

### Process Voice Input
```kotlin
val response = orchestrator.process("Hello SHEDOW")
TTS.speak(response)
```

### Get Memory
```kotlin
val history = orchestrator.getMemory(limit = 50)
```

## WebSocket (Real-time)

TODO: WebSocket implementation for streaming responses

## Error Handling

```kotlin
try {
    val response = orchestrator.process(input)
    TTS.speak(response)
} catch (e: Exception) {
    TTS.speak("Error processing request")
    Log.e("SHEDOW", e.message ?: "Unknown error")
}
```
