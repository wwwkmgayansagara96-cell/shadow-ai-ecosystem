package com.shadow.ai.memory

import java.time.LocalDateTime

/**
 * 🧠 MEMORY GRAPH
 * 
 * Persistent graph-based memory system for:
 * - User personality learning
 * - Habit tracking
 * - Context prediction
 * - Long-term memory
 */
data class MemoryNode(
    val id: String,
    val input: String,
    val response: String,
    val timestamp: Long = System.currentTimeMillis(),
    val contextTags: List<String> = emptyList(),
    val relatedNodeIds: List<String> = emptyList(),
    val importance: Float = 0.5f,
    val source: String = "unknown" // plugin, offline, cloud
)

data class MemoryEdge(
    val fromNodeId: String,
    val toNodeId: String,
    val relationship: String, // "related", "consequence", "similar", etc.
    val weight: Float = 1.0f
)

/**
 * Graph-based memory storage
 */
class MemoryGraph {
    private val nodes = mutableMapOf<String, MemoryNode>()
    private val edges = mutableListOf<MemoryEdge>()
    private var nodeCounter = 0

    /**
     * Store input in memory
     */
    fun store(input: String) {
        val nodeId = "node_${nodeCounter++}"
        nodes[nodeId] = MemoryNode(
            id = nodeId,
            input = input,
            response = "",
            contextTags = extractTags(input)
        )
    }

    /**
     * Store input with response
     */
    fun store(input: String, response: String, source: String = "unknown") {
        val nodeId = "node_${nodeCounter++}"
        val node = MemoryNode(
            id = nodeId,
            input = input,
            response = response,
            contextTags = extractTags(input),
            source = source,
            importance = calculateImportance(input, response)
        )
        nodes[nodeId] = node
        connectToRelated(nodeId, node)
    }

    /**
     * Get context for similar inputs
     */
    fun getContext(input: String): List<String> {
        val tags = extractTags(input)
        return nodes.values
            .filter { node -> tags.any { it in node.contextTags } }
            .sortedByDescending { it.timestamp }
            .map { it.response }
            .take(3)
    }

    /**
     * Get all nodes
     */
    fun getAllNodes(): List<MemoryNode> = nodes.values.toList()

    /**
     * Get node by ID
     */
    fun getNode(id: String): MemoryNode? = nodes[id]

    /**
     * Search memory by tag
     */
    fun searchByTag(tag: String): List<MemoryNode> {
        return nodes.values.filter { tag in it.contextTags }
    }

    /**
     * Extract context tags from input
     */
    private fun extractTags(input: String): List<String> {
        val keywords = input.split(" ")
            .filter { it.length > 3 }
            .map { it.lowercase() }
        return keywords.distinct().take(5)
    }

    /**
     * Calculate importance score
     */
    private fun calculateImportance(input: String, response: String): Float {
        var score = 0.5f
        if (input.length > 20) score += 0.1f
        if (response.isNotEmpty()) score += 0.2f
        return score.coerceIn(0f, 1f)
    }

    /**
     * Connect new node to related existing nodes
     */
    private fun connectToRelated(nodeId: String, node: MemoryNode) {
        nodes.values
            .filter { it.id != nodeId }
            .filter { existing -> 
                existing.contextTags.any { it in node.contextTags }
            }
            .forEach { related ->
                edges.add(
                    MemoryEdge(
                        fromNodeId = nodeId,
                        toNodeId = related.id,
                        relationship = "related",
                        weight = 0.8f
                    )
                )
            }
    }

    /**
     * Clear old memories (older than 30 days)
     */
    fun cleanup() {
        val thirtyDaysAgo = System.currentTimeMillis() - (30 * 24 * 60 * 60 * 1000)
        nodes.values.removeAll { it.timestamp < thirtyDaysAgo }
    }
}
