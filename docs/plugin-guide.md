# 🔌 Plugin Development Guide

## Creating a Plugin

Plugins extend SHEDOW's capabilities. Here's how to create one.

### Step 1: Implement Interface

```kotlin
package com.shadow.ai.plugin.plugins

import com.shadow.ai.plugin.ShedowPlugin

class YourPlugin : ShedowPlugin {
    override fun name() = "YourPlugin"
    override fun description() = "What your plugin does"
    override fun priority() = 100 // Higher = executed first
    
    override fun canHandle(input: String): Boolean {
        // Return true if your plugin should handle this input
        return input.contains("your_keyword")
    }
    
    override suspend fun execute(input: String): String {
        // Execute the action and return response
        return "Result"
    }
    
    override fun version() = "1.0.0"
}
```

### Step 2: Register Plugin

```kotlin
val pluginManager = PluginManager()
pluginManager.register(YourPlugin())
```

### Step 3: Handle Input Parsing

```kotlin
override fun canHandle(input: String): Boolean {
    val keywords = listOf("send", "message", "sms")
    return keywords.any { input.contains(it, ignoreCase = true) }
}

override suspend fun execute(input: String): String {
    val contact = extractContact(input)  // "send message to John"
    val message = extractMessage(input)  // "Say hello"
    return "Sending '$message' to $contact"
}

private fun extractContact(input: String): String {
    // Parse contact from input
    // Regex, keyword search, etc.
    return ""
}
```

## Example Plugins

### 1. Calculator Plugin

```kotlin
class CalculatorPlugin : ShedowPlugin {
    override fun name() = "Calculator"
    override fun priority() = 95
    
    override fun canHandle(input: String): Boolean {
        return input.matches(Regex(".*\\d+\\s*[+\\-*/]\\s*\\d+.*"))
    }
    
    override suspend fun execute(input: String): String {
        return try {
            val result = evaluate(input)
            "The answer is $result"
        } catch (e: Exception) {
            "Error: ${e.message}"
        }
    }
    
    private fun evaluate(input: String): Double {
        // Use a safe expression evaluator
        // ... implement calculation logic
        return 0.0
    }
}
```

### 2. Weather Plugin

```kotlin
class WeatherPlugin : ShedowPlugin {
    override fun name() = "Weather"
    override fun priority() = 80
    
    override fun canHandle(input: String): Boolean {
        return "weather" in input.lowercase() || "temperature" in input.lowercase()
    }
    
    override suspend fun execute(input: String): String {
        // Requires cloud API call or local weather data
        return "Fetching weather data..."
    }
}
```

### 3. Notes Plugin

```kotlin
class NotesPlugin : ShedowPlugin {
    override fun name() = "Notes"
    override fun priority() = 85
    
    override fun canHandle(input: String): Boolean {
        val keywords = listOf("note", "remember", "save", "memo")
        return keywords.any { input.contains(it, ignoreCase = true) }
    }
    
    override suspend fun execute(input: String): String {
        val note = input.removePrefix("note").trim()
        saveNote(note)
        return "Note saved: $note"
    }
    
    private fun saveNote(text: String) {
        // Save to local database or file
    }
}
```

## Best Practices

### 1. Priority Ordering
```kotlin
// Most specific first
CalculatorPlugin()    // priority = 100
WeatherPlugin()       // priority = 95
NotesPlugin()         // priority = 85
WebSearchPlugin()     // priority = 50
GreetingPlugin()      // priority = 10
```

### 2. Error Handling
```kotlin
override suspend fun execute(input: String): String {
    return try {
        // Do work
        performAction(input)
    } catch (e: Exception) {
        "Sorry, ${name()} encountered an error: ${e.message}"
    }
}
```

### 3. Async Operations
```kotlin
override suspend fun execute(input: String): String {
    // Safe to use suspend functions
    val data = fetchFromNetwork()  // suspend function
    return processData(data)
}
```

### 4. Input Validation
```kotlin
override fun canHandle(input: String): Boolean {
    val minLength = 3
    val hasKeyword = "your_keyword" in input.lowercase()
    return input.length >= minLength && hasKeyword
}
```

## Plugin Lifecycle

1. **Registration** - Plugin is registered with PluginManager
2. **Matching** - Input is checked against canHandle()
3. **Execution** - execute() is called
4. **Memory** - Result is stored in MemoryGraph
5. **Return** - Response is returned to user

## Testing Plugins

```kotlin
@Test
fun testPluginCanHandle() {
    val plugin = YourPlugin()
    assertTrue(plugin.canHandle("your test input"))
    assertFalse(plugin.canHandle("unrelated input"))
}

@Test
suspend fun testPluginExecution() {
    val plugin = YourPlugin()
    val result = plugin.execute("your test input")
    assertEquals("Expected result", result)
}
```

## Publishing Plugin

1. Create in `core/plugin-system/plugins/`
2. Implement `ShedowPlugin`
3. Add unit tests
4. Document in plugin description
5. Register in app initialization

## Plugin Registry (Future)

Common plugins to implement:
- ✅ WhatsApp
- ✅ SMS
- ✅ Time/Alarms
- 📞 Contacts
- 📱 Settings
- 🔔 Notifications
- 📝 Notes
- 🧮 Calculator
- 📍 Location
- 🎵 Music
