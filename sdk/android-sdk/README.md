# SHEDOW AI Android SDK

Official SDK for integrating SHEDOW AI into Android applications.

## Installation

```gradle
dependencies {
    implementation 'com.shedow:ai-sdk:1.0.0'
}
```

## Quick Start

```kotlin
val shedow = ShedowAI.Builder(context)
    .setApiKey("your_api_key")
    .setPreferOffline(false)
    .build()

val response = shedow.process("What time is it?")
Log.d("SHEDOW", response.output)
```

## Features

- ✅ Easy voice input/output
- ✅ Offline + cloud AI
- ✅ Plugin system integration
- ✅ Memory graph access
- ✅ Kotlin coroutines support

## Documentation

Full documentation available at [docs.shedow.ai](https://docs.shedow.ai)
