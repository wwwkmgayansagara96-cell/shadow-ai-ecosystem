package com.shadow.ai.plugin.plugins

import com.shadow.ai.plugin.ShedowPlugin

/**
 * 🔌 WHATSAPP SKILL
 * 
 * Opens WhatsApp and optionally sends a message
 */
class WhatsAppPlugin : ShedowPlugin {

    override fun name() = "WhatsApp"

    override fun description() = "Open WhatsApp and send messages"

    override fun priority() = 100

    override fun canHandle(input: String): Boolean {
        return input.contains("whatsapp", ignoreCase = true) ||
               input.contains("message", ignoreCase = true) ||
               input.contains("sms", ignoreCase = true)
    }

    override suspend fun execute(input: String): String {
        return when {
            "send" in input.lowercase() -> {
                // Extract message and contact
                val contact = extractContact(input)
                val message = extractMessage(input)
                "Opening WhatsApp with contact: $contact, message: $message"
            }
            else -> "Opening WhatsApp..."
        }
    }

    private fun extractContact(input: String): String {
        // Simple extraction logic
        return "Unknown"
    }

    private fun extractMessage(input: String): String {
        // Simple extraction logic
        return input
    }
}
