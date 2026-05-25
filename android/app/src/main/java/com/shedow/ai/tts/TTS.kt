package com.shedow.ai.tts

import android.content.Context
import android.speech.tts.TextToSpeech
import java.util.Locale

/**
 * 🔊 TEXT-TO-SPEECH ENGINE
 * Jarvis-like voice personality
 */
object TTS {

    private var engine: TextToSpeech? = null
    private var isReady = false

    /**
     * Initialize TTS engine
     */
    fun init(context: Context) {
        engine = TextToSpeech(context) { status ->
            if (status == TextToSpeech.SUCCESS) {
                isReady = true
                configureVoice()
            }
        }
    }

    /**
     * Configure voice characteristics
     */
    private fun configureVoice() {
        engine?.apply {
            language = Locale.US
            setPitch(0.85f) // Slightly deeper voice
            setSpeechRate(0.95f) // Normal speed
        }
    }

    /**
     * Speak text
     */
    fun speak(text: String) {
        if (isReady && engine != null) {
            engine?.speak(text, TextToSpeech.QUEUE_FLUSH, null, null)
        }
    }

    /**
     * Stop speaking
     */
    fun stop() {
        engine?.stop()
    }

    /**
     * Shutdown TTS
     */
    fun shutdown() {
        engine?.shutdown()
        isReady = false
    }
}
