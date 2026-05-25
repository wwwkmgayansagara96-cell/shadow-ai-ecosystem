package com.shedow.ai.tts

import android.content.Context
import android.speech.tts.TextToSpeech
import java.util.Locale

/**
 * Text-to-Speech Engine - Jarvis voice output
 * Provides natural and personalized voice responses
 */
object TTS {

    private var engine: TextToSpeech? = null
    private var isReady = false

    fun init(context: Context) {
        engine = TextToSpeech(context) { status ->
            if (status == TextToSpeech.SUCCESS) {
                isReady = true
                // Configure Jarvis personality
                engine?.apply {
                    language = Locale.US
                    setPitch(0.85f)  // Slightly deeper voice
                    setSpeechRate(0.95f)  // Normal speed
                }
            }
        }
    }

    fun speak(text: String) {
        if (isReady && engine != null) {
            engine?.speak(text, TextToSpeech.QUEUE_FLUSH, null, null)
        }
    }

    fun stop() {
        if (engine != null) {
            engine?.stop()
        }
    }

    fun shutdown() {
        if (engine != null) {
            engine?.shutdown()
            isReady = false
        }
    }
}
