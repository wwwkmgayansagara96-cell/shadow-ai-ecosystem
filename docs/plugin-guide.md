# Plugin Development Guide

## Creating a Custom Plugin

Plugins extend SHEDOW AI with custom skills and capabilities.

## Plugin Interface

```kotlin
interface ShedowPlugin {
    fun name(): String
    fun canHandle(input: String): Boolean
    fun execute(input: String): String
}
```

## Example: Weather Plugin

```kotlin
class WeatherPlugin : ShedowPlugin {
    
    override fun name() = "Weather"
    
    override fun canHandle(input: String): Boolean {
        return input.contains("weather") || 
               input.contains("forecast") ||
               input.contains("temperature")
    }
    
    override fun execute(input: String): String {
        val location = extractLocation(input)
        val weather = fetchWeather(location)
        return "The weather in $location is ${weather.condition}. Temperature is ${weather.temp}°C."
    }
    
    private fun extractLocation(input: String): String {
        // Parse location from input
        return "New York"
    }
    
    private fun fetchWeather(location: String): Weather {
        // Call weather API
        return Weather("Sunny", 72)
    }
}

data class Weather(val condition: String, val temp: Int)
```

## Publishing a Plugin

1. Create plugin JAR
2. Sign with your key
3. Upload to SHEDOW Plugin Registry
4. Users can install via API

```kotlin
shedow.installPlugin("https://plugins.shedow.ai/weather-plugin.jar")
```

## Best Practices

- Keep responses under 200 characters
- Handle errors gracefully
- Use caching for API calls
- Test with various inputs
- Document your plugin

## Support

For questions, visit [dev.shedow.ai](https://dev.shedow.ai)
