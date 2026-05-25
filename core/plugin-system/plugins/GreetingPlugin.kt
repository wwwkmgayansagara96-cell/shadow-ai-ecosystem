package com.shadow.ai.plugin.plugins

import com.shadow.ai.plugin.ShedowPlugin

/**
 * 👋 GREETING SKILL
 * 
 * Simple greeting and introduction
 */
class GreetingPlugin : ShedowPlugin {

    override fun name() = "Greeting"

    override fun description() = "Greet the user"

    override fun priority() = 90

    override fun canHandle(input: String): Boolean {
        val greetings = listOf("hello", "hi", "hey", "greetings", "good morning", "good evening")
        return greetings.any { input.contains(it, ignoreCase = true) }
    }

    override suspend fun execute(input: String): String {
        return when {
            "who are you" in input.lowercase() -> 
                "I am SHEDOW, your personal AI assistant. I run offline and connect to the cloud when needed."
            else -> "Hello! How can I assist you today?"
        }
    }
}
