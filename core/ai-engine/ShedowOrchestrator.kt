package com.shadow.ai.engine

import com.shadow.ai.memory.MemoryGraph
import com.shadow.ai.plugin.PluginManager
import com.shadow.ai.offline.OfflineEngine
import com.shadow.ai.cloud.CloudAI
import kotlinx.coroutines.delay

/**
 * 🌙 SHEDOW ORCHESTRATOR
 * 
 * Core intelligence coordinator:
 * 1. Stores input in memory graph
 * 2. Tries plugins first (fastest)
 * 3. Falls back to offline AI
 * 4. Falls back to cloud AI if needed
 * 5. Stores result in memory for learning
 */
class ShedowOrchestrator(
    private val offline: OfflineEngine,
    private val cloud: CloudAI,
    private val plugins: PluginManager,
    private val memory: MemoryGraph
) {

    suspend fun handle(input: String): String {
        try {
            // 🧠 Store input in memory graph
            memory.store(input)

            // 🔌 1. Try plugins first (instant execution)
            plugins.findMatch(input)?.let { plugin ->
                val result = plugin.execute(input)
                memory.store(input, result, "plugin:${plugin.name()}")
                return result
            }

            // 🧠 2. Try offline AI (no internet needed)
            val offlineResult = offline.respond(input)
            
            if (offlineResult != "NEEDS_CLOUD") {
                memory.store(input, offlineResult, "offline")
                return offlineResult
            }

            // ☁️ 3. Fallback to cloud AI (powerful but slower)
            val cloudResult = cloud.ask(input)
            memory.store(input, cloudResult, "cloud")
            return cloudResult

        } catch (e: Exception) {
            return "Error: ${e.message}"
        }
    }

    /**
     * Analyze input and determine best handler
     */
    suspend fun analyze(input: String): AnalysisResult {
        val pastContext = memory.getContext(input)
        val confidence = calculateConfidence(input, pastContext)
        
        return AnalysisResult(
            input = input,
            confidence = confidence,
            suggestedHandler = suggestHandler(input, confidence),
            context = pastContext
        )
    }

    private fun calculateConfidence(input: String, context: List<String>): Float {
        // Simple confidence scoring
        return when {
            plugins.findMatch(input) != null -> 0.95f
            offline.canRespond(input) -> 0.85f
            else -> 0.5f
        }
    }

    private fun suggestHandler(input: String, confidence: Float): String {
        return when {
            confidence > 0.9f -> "PLUGIN"
            confidence > 0.8f -> "OFFLINE"
            else -> "CLOUD"
        }
    }
}

data class AnalysisResult(
    val input: String,
    val confidence: Float,
    val suggestedHandler: String,
    val context: List<String>
)
