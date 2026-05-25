package com.shedow.ai.android

import android.content.Intent
import android.os.Bundle
import androidx.appcompat.app.AppCompatActivity
import com.shedow.ai.services.WakeWordService
import com.shedow.ai.services.VoiceService
import com.shedow.ai.tts.TTS

/**
 * Main Activity for SHEDOW AI Assistant
 * Launches voice services and initializes the system
 */
class MainActivity : AppCompatActivity() {

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_main)

        initializeServices()
        TTS.init(this)
        TTS.speak("SHEDOW AI system online")
    }

    private fun initializeServices() {
        // Start wake word detection service
        startService(Intent(this, WakeWordService::class.java))
        
        // Start voice input service
        startService(Intent(this, VoiceService::class.java))
    }

    override fun onDestroy() {
        super.onDestroy()
        stopService(Intent(this, WakeWordService::class.java))
        stopService(Intent(this, VoiceService::class.java))
    }
}
