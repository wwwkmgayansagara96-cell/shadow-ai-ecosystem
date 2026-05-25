package com.shadow.ai.plugin.plugins

import com.shadow.ai.plugin.ShedowPlugin
import java.time.LocalDateTime
import java.time.format.DateTimeFormatter

/**
 * ⏰ TIME SKILL
 * 
 * Get current time, set alarms, manage schedules
 */
class TimePlugin : ShedowPlugin {

    override fun name() = "Time"

    override fun description() = "Get time, set alarms, manage schedules"

    override fun priority() = 100

    override fun canHandle(input: String): Boolean {
        val keywords = listOf("time", "what time", "current time", "alarm", "clock", "hour", "minute")
        return keywords.any { input.contains(it, ignoreCase = true) }
    }

    override suspend fun execute(input: String): String {
        return when {
            "alarm" in input.lowercase() -> "Setting alarm..."
            else -> {
                val now = LocalDateTime.now()
                val formatter = DateTimeFormatter.ofPattern("HH:mm:ss")
                "Current time is ${now.format(formatter)}"
            }
        }
    }
}
