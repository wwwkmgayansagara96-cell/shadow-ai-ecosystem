package com.shedow.ai.services

import android.app.Service
import android.content.Intent
import android.os.IBinder
import ai.picovoice.porcupine.Porcupine
import ai.picovoice.porcupine.PorcupineManager
import com.shedow.ai.tts.TTS

/**
 * Wake Word Service - Listens for "Hey SHEDOW"
 * Ultra-low power consumption (<1% CPU)
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
                .setAccessKey("YOUR_PORCUPINE_ACCESS_KEY")  // Get from Picovoice
                .setKeyword(Porcupine.BuiltInKeyword.JARVIS)
                .setSensitivity(0.8f)
                .build(applicationContext) { keywordIndex ->
                    // Wake word detected!
                    onWakeWordDetected()
                }

            porcupineManager?.start()
        } catch (e: Exception) {
            e.printStackTrace()
        }
    }

    private fun onWakeWordDetected() {
        // Acknowledge and wake up
        TTS.speak("Yes?")
        
        // Launch main activity or voice input UI
        startActivity(
            Intent(this, MainActivity::class.java)
                .addFlags(Intent.FLAG_ACTIVITY_NEW_TASK)
        )
    }

    override fun onStartCommand(intent: Intent?, flags: Int, startId: Int): Int {
        return START_STICKY  // Keep running
    }

    override fun onBind(intent: Intent?): IBinder? = null

    override fun onDestroy() {
        super.onDestroy()
        porcupineManager?.stop()
        porcupineManager?.delete()
    }
}
