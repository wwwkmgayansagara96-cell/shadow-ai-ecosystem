#!/bin/bash

set -e

echo "🚀 Building SHEDOW AI APK..."

cd android

# Clean
echo "🧹 Cleaning..."
./gradlew clean

# Build
echo "🔨 Building APK..."
./gradlew assembleDebug

if [ $? -eq 0 ]; then
    echo "✅ APK Build Successful!"
    echo "📱 Location: android/app/build/outputs/apk/debug/app-debug.apk"
    echo ""
    echo "📦 To install on device:"
    echo "   adb install -r android/app/build/outputs/apk/debug/app-debug.apk"
else
    echo "❌ Build failed!"
    exit 1
fi
