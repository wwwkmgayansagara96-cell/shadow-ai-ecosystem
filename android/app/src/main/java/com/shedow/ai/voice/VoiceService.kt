package com.shedow.ai.voice

import android.app.Service
import android.content.Intent
import android.os.IBinder
import android.speech.RecognitionListener
import android.speech.RecognizerIntent
import android.speech.SpeechRecognizer
import android.os.Bundle
import kotlinx.coroutines.GlobalScope
import kotlinx.coroutines.launch
import com.shedow.ai.core.AIOrchestrator
import com.shedow.ai.tts.TTS

/**
 * 🎤 VOICE SERVICE - CONTINUOUS LISTENER
 * Captures and processes voice commands
 */
class VoiceService : Service() {

    private var recognizer: SpeechRecognizer? = null
    private lateinit var orchestrator: AIOrchestrator

    override fun onCreate() {
        super.onCreate()
        recognizer = SpeechRecognizer.createSpeechRecognizer(this)
        // Initialize orchestrator with actual instances
        // orchestrator = AIOrchestrator(OfflineLLM(), CloudAI(apiKey), MemoryDB())
    }

    override fun onStartCommand(intent: Intent?, flags: Int, startId: Int): Int {
        startListening()
        return START_STICKY
    }

    private fun startListening() {
        val intent = Intent(RecognizerIntent.ACTION_RECOGNIZE_SPEECH).apply {
            putExtra(RecognizerIntent.EXTRA_LANGUAGE_MODEL, RecognizerIntent.LANGUAGE_MODEL_FREE_FORM)
            putExtra(RecognizerIntent.EXTRA_MAX_RESULTS, 1)
        }

        recognizer?.setRecognitionListener(object : RecognitionListener {

            override fun onReadyForSpeech(params: Bundle?) {}
            override fun onBeginningOfSpeech() {}
            override fun onRmsChanged(rmsdB: Float) {}
            override fun onBufferReceived(buffer: ByteArray?) {}
            override fun onEndOfSpeech() {}
            override fun onPartialResults(partialResults: Bundle?) {}
            override fun onEvent(eventType: Int, params: Bundle?) {}

            override fun onResults(results: Bundle) {
                val voiceText = results
                    .getStringArrayList(SpeechRecognizer.RESULTS_RECOGNITION)
                    ?.firstOrNull() ?: ""

                if (voiceText.isNotEmpty()) {
                    // Process through AI Orchestrator
                    GlobalScope.launch {
                        // val reply = orchestrator.process(voiceText)
                        val reply = "Processing: $voiceText" // Placeholder
                        TTS.speak(reply)
                    }
                }

                // Restart listening
                startListening()
            }

            override fun onError(error: Int) {
                startListening()
            }
        })

        recognizer?.startListening(intent)
    }

    override fun onBind(intent: Intent?): IBinder? = null

    override fun onDestroy() {
        super.onDestroy()
        recognizer?.destroy()
    }
}
