#!/bin/bash

set -e

echo "🚀 Building SHEDOW AI for Google Play Store..."

cd android

# Clean
echo "🧹 Cleaning..."
./gradlew clean

# Build release
echo "🔨 Building AAB..."
./gradlew bundleRelease

if [ $? -eq 0 ]; then
    echo "✅ AAB Build Successful!"
    echo "📱 Location: android/app/build/outputs/bundle/release/app-release.aab"
    echo ""
    echo "📋 Next steps:"
    echo "   1. Sign the AAB with your release keystore"
    echo "   2. Upload to Google Play Console"
    echo "   3. Add release notes"
    echo "   4. Submit for review"
else
    echo "❌ Build failed!"
    exit 1
fi
