package com.shedow.ai.ai

import retrofit2.http.POST
import retrofit2.http.Body
import com.squareup.retrofit2.Retrofit
import com.squareup.retrofit2.converter.gson.GsonConverterFactory

/**
 * ☁️ CLOUD AI SERVICE
 * OpenAI GPT-4o integration for advanced queries
 */
class CloudAI(private val apiKey: String) {

    private val retrofit = Retrofit.Builder()
        .baseUrl("https://api.openai.com/v1/")
        .addConverterFactory(GsonConverterFactory.create())
        .build()

    private val apiService = retrofit.create(OpenAIService::class.java)

    /**
     * Send query to cloud AI
     */
    suspend fun ask(prompt: String): String {
        return try {
            val request = OpenAIRequest(
                model = "gpt-4o-mini",
                messages = listOf(
                    Message(role = "user", content = prompt)
                ),
                temperature = 0.7
            )

            val response = apiService.createCompletion(
                authorization = "Bearer $apiKey",
                request = request
            )

            response.choices.firstOrNull()?.message?.content 
                ?: "I couldn't generate a response."
        } catch (e: Exception) {
            e.printStackTrace()
            "Cloud AI is unavailable. Switching to offline mode."
        }
    }
}

interface OpenAIService {
    @POST("chat/completions")
    suspend fun createCompletion(
        @retrofit2.http.Header("Authorization") authorization: String,
        @Body request: OpenAIRequest
    ): OpenAIResponse
}

data class OpenAIRequest(
    val model: String,
    val messages: List<Message>,
    val temperature: Double = 0.7
)

data class Message(
    val role: String,
    val content: String
)

data class OpenAIResponse(
    val choices: List<Choice>
)

data class Choice(
    val message: Message
)
