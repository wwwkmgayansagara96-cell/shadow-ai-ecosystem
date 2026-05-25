-keep class com.shedow.ai.** { *; }
-keep class com.google.android.gms.** { *; }
-keep class ai.picovoice.** { *; }
-keep class okhttp3.** { *; }
-keep class retrofit2.** { *; }
-keep class com.google.gson.** { *; }

-dontwarn com.google.android.gms.**
-dontwarn okhttp3.**
-dontwarn retrofit2.**
-dontwarn ai.picovoice.**

-keepclasseswithmembernames class * {
    native <methods>;
}
