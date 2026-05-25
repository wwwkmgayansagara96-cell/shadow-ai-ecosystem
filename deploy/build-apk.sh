#!/bin/bash

echo "🚀 Building SHEDOW AI APK..."

cd apps/android-app

# Clean previous builds
echo "🧹 Cleaning previous builds..."
./gradlew clean

# Build debug APK
echo "🔨 Building APK..."
./gradlew assembleDebug

if [ $? -eq 0 ]; then
    echo "✅ APK build successful!"
    echo "📱 APK location: app/build/outputs/apk/debug/app-debug.apk"
    echo ""
    echo "📦 To install on device:"
    echo "   adb install -r app/build/outputs/apk/debug/app-debug.apk"
else
    echo "❌ APK build failed!"
    exit 1
fi
