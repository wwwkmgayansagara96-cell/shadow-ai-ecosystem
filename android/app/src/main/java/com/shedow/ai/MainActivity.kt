package com.shedow.ai

import android.content.Intent
import android.os.Bundle
import androidx.activity.ComponentActivity
import androidx.activity.compose.setContent
import androidx.compose.foundation.background
import androidx.compose.foundation.layout.*
import androidx.compose.material3.*
import androidx.compose.runtime.*
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.Mic
import androidx.compose.material.icons.filled.Settings
import com.shedow.ai.voice.WakeWordService
import com.shedow.ai.voice.VoiceService
import com.shedow.ai.tts.TTS

/**
 * 🤖 SHEDOW AI - Main Activity
 * Voice-first AI Assistant Interface
 */
class MainActivity : ComponentActivity() {

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        
        // Initialize TTS
        TTS.init(this)
        
        // Start voice services
        startVoiceServices()
        
        setContent {
            ShedowAITheme {
                MainScreen()
            }
        }
    }

    private fun startVoiceServices() {
        // Start Wake Word Service
        startService(Intent(this, WakeWordService::class.java))
        
        // Start Voice Service
        startService(Intent(this, VoiceService::class.java))
        
        // Welcome message
        TTS.speak("SHEDOW AI system online")
    }

    override fun onDestroy() {
        super.onDestroy()
        stopService(Intent(this, WakeWordService::class.java))
        stopService(Intent(this, VoiceService::class.java))
    }
}

@Composable
fun MainScreen() {
    var isListening by remember { mutableStateOf(false) }
    var assistantMessage by remember { mutableStateOf("Say 'Hey SHEDOW' to start...") }

    Box(
        modifier = Modifier
            .fillMaxSize()
            .background(Color(0x0a0a0a))
    ) {
        Column(
            modifier = Modifier
                .fillMaxSize()
                .padding(24.dp),
            horizontalAlignment = Alignment.CenterHorizontally,
            verticalArrangement = Arrangement.Center
        ) {
            // SHEDOW Logo
            Box(
                modifier = Modifier
                    .size(100.dp)
                    .background(
                        color = Color(0x00d4ff),
                        shape = RoundedCornerShape(12.dp)
                    ),
                contentAlignment = Alignment.Center
            ) {
                Text(
                    "S",
                    fontSize = 48.sp,
                    color = Color(0x0a0a0a),
                    style = MaterialTheme.typography.displayLarge
                )
            }

            Spacer(modifier = Modifier.height(24.dp))

            Text(
                "SHEDOW AI",
                fontSize = 32.sp,
                color = Color.White,
                style = MaterialTheme.typography.headlineLarge
            )

            Spacer(modifier = Modifier.height(8.dp))

            Text(
                "Smart Voice Assistant",
                fontSize = 14.sp,
                color = Color(0xaaaaaa)
            )

            Spacer(modifier = Modifier.height(48.dp))

            // Assistant Response
            Card(
                modifier = Modifier
                    .fillMaxWidth()
                    .padding(horizontal = 16.dp),
                colors = CardDefaults.cardColors(
                    containerColor = Color(0x1a1a1a)
                )
            ) {
                Text(
                    assistantMessage,
                    modifier = Modifier.padding(16.dp),
                    fontSize = 16.sp,
                    color = Color(0xdddddd),
                    style = MaterialTheme.typography.bodyMedium
                )
            }

            Spacer(modifier = Modifier.height(48.dp))

            // Mic Button
            Button(
                onClick = { isListening = !isListening },
                modifier = Modifier
                    .size(80.dp),
                colors = ButtonDefaults.buttonColors(
                    containerColor = Color(0x00d4ff)
                ),
                shape = RoundedCornerShape(12.dp)
            ) {
                Icon(
                    Icons.Default.Mic,
                    contentDescription = "Voice",
                    tint = Color(0x0a0a0a),
                    modifier = Modifier.size(40.dp)
                )
            }

            Spacer(modifier = Modifier.height(24.dp))

            Text(
                if (isListening) "Listening..." else "Tap to speak",
                fontSize = 12.sp,
                color = Color(0xaaaaaa)
            )
        }
    }
}

@Composable
fun ShedowAITheme(content: @Composable () -> Unit) {
    MaterialTheme(
        colorScheme = darkColorScheme(
            primary = Color(0x00d4ff),
            secondary = Color(0xa855f7),
            tertiary = Color(0x10b981),
            background = Color(0x0a0a0a),
            surface = Color(0x1a1a1a)
        ),
        content = content
    )
}

private val RoundedCornerShape = androidx.compose.foundation.shape.RoundedCornerShape
