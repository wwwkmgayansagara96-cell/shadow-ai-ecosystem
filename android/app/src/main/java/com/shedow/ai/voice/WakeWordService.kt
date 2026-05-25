package com.shedow.ai.voice

import android.app.Service
import android.content.Intent
import android.os.IBinder
import ai.picovoice.porcupine.Porcupine
import ai.picovoice.porcupine.PorcupineManager
import com.shedow.ai.MainActivity
import com.shedow.ai.tts.TTS

/**
 * 🎤 WAKE WORD SERVICE - JARVIS MODE
 * Listens for "Hey SHEDOW" activation
 * Ultra-low power consumption
 */
class WakeWordService : Service() {

    private var porcupineManager: PorcupineManager? = null

    override fun onCreate() {
        super.onCreate()
        initializeWakeWord()
    }

    private fun initializeWakeWord() {
        try {
            porcupineManager = PorcupineManager.Builder()
                .setAccessKey("YOUR_PORCUPINE_ACCESS_KEY") // Get from https://console.picovoice.ai/
                .setKeyword(Porcupine.BuiltInKeyword.JARVIS) // "Hey Google" style
                .setSensitivity(0.8f) // Adjust sensitivity (0.0 - 1.0)
                .build(applicationContext) { keywordIndex ->
                    onWakeWordDetected()
                }

            porcupineManager?.start()
            println("✅ Wake word service started")
        } catch (e: Exception) {
            e.printStackTrace()
            println("❌ Failed to initialize wake word: ${e.message}")
        }
    }

    private fun onWakeWordDetected() {
        // Acknowledge activation
        TTS.speak("Yes?")

        // Launch main activity
        startActivity(
            Intent(this, MainActivity::class.java)
                .addFlags(Intent.FLAG_ACTIVITY_NEW_TASK)
        )
    }

    override fun onStartCommand(intent: Intent?, flags: Int, startId: Int): Int {
        return START_STICKY // Keep running
    }

    override fun onBind(intent: Intent?): IBinder? = null

    override fun onDestroy() {
        super.onDestroy()
        porcupineManager?.stop()
        porcupineManager?.delete()
    }
}
