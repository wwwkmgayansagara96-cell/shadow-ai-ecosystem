package com.shadow.ai.plugin

/**
 * 🔌 SHEDOW PLUGIN INTERFACE
 * 
 * Base interface for all Jarvis skills.
 * Implement this to add new capabilities.
 */
interface ShedowPlugin {
    /**
     * Plugin unique identifier
     */
    fun name(): String

    /**
     * Check if this plugin can handle the input
     */
    fun canHandle(input: String): Boolean

    /**
     * Execute the plugin action
     */
    suspend fun execute(input: String): String

    /**
     * Plugin version
     */
    fun version(): String = "1.0.0"

    /**
     * Plugin description
     */
    fun description(): String = "A Shedow plugin"

    /**
     * Plugin priority (higher = executed first)
     */
    fun priority(): Int = 0
}

/**
 * Plugin Manager - loads and manages all plugins
 */
class PluginManager {
    private val plugins = mutableListOf<ShedowPlugin>()

    /**
     * Register a new plugin
     */
    fun register(plugin: ShedowPlugin) {
        plugins.add(plugin)
        // Sort by priority
        plugins.sortByDescending { it.priority() }
    }

    /**
     * Find a plugin that can handle the input
     */
    fun findMatch(input: String): ShedowPlugin? {
        return plugins.firstOrNull { it.canHandle(input) }
    }

    /**
     * Get all plugins
     */
    fun getAllPlugins(): List<ShedowPlugin> = plugins.toList()

    /**
     * Unregister a plugin
     */
    fun unregister(pluginName: String) {
        plugins.removeAll { it.name() == pluginName }
    }
}
