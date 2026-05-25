package com.shedow.ai.memory

import androidx.room.Database
import androidx.room.RoomDatabase
import androidx.room.Entity
import androidx.room.PrimaryKey
import androidx.room.Dao
import androidx.room.Insert
import androidx.room.Query

/**
 * 💾 MEMORY DATABASE
 * Persistent conversation history & context
 */

@Entity(tableName = "memory_nodes")
data class MemoryNode(
    @PrimaryKey(autoGenerate = true) val id: Int = 0,
    val input: String,
    val response: String,
    val timestamp: Long = System.currentTimeMillis(),
    val source: String, // "offline", "cloud", "plugin"
    val tags: String = ""
)

@Dao
interface MemoryDao {
    @Insert
    suspend fun insert(node: MemoryNode)

    @Query("SELECT * FROM memory_nodes ORDER BY timestamp DESC LIMIT :limit")
    suspend fun fetch(limit: Int): List<MemoryNode>

    @Query("DELETE FROM memory_nodes")
    suspend fun clear()
}

@Database(entities = [MemoryNode::class], version = 1)
abstract class MemoryDatabase : RoomDatabase() {
    abstract fun memoryDao(): MemoryDao
}

/**
 * Memory Service - High-level API
 */
class MemoryDB(private val dao: MemoryDao) {

    suspend fun save(text: String, source: String) {
        val node = MemoryNode(
            input = text,
            response = text,
            source = source
        )
        dao.insert(node)
    }

    suspend fun fetch(limit: Int): List<String> {
        return dao.fetch(limit).map { it.response }
    }

    suspend fun clear() {
        dao.clear()
    }
}
