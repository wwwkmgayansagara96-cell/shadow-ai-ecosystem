package com.shedow.ai.core

import kotlinx.coroutines.GlobalScope
import kotlinx.coroutines.launch
import com.shedow.ai.ai.OfflineLLM
import com.shedow.ai.ai.CloudAI
import com.shedow.ai.memory.MemoryDB

/**
 * 🧠 AI ORCHESTRATOR - CORE BRAIN
 * Intelligent routing: Plugin → Offline → Cloud
 */
class AIOrchestrator(
    private val offline: OfflineLLM,
    private val cloud: CloudAI,
    private val memory: MemoryDB
) {

    /**
     * Main processing pipeline
     * Priority: Fast → Offline → Cloud Intelligence
     */
    suspend fun process(input: String): String {
        
        // 🧠 Step 1: Store input in memory
        memory.save(input, "input")

        // ⚡ Step 2: Try offline AI (fast, no internet)
        val offlineResponse = offline.respond(input)
        
        if (offlineResponse.contains("LIMITED_MODE")) {
            // 🌐 Step 3: Fall back to cloud AI
            val cloudResponse = cloud.ask(input)
            memory.save(cloudResponse, "cloud_response")
            return cloudResponse
        }

        // ✅ Use offline response
        memory.save(offlineResponse, "offline_response")
        return offlineResponse
    }

    /**
     * Get conversation history
     */
    suspend fun getMemory(limit: Int = 50): List<String> {
        return memory.fetch(limit)
    }

    /**
     * Clear memory (privacy)
     */
    suspend fun clearMemory() {
        memory.clear()
    }
}
