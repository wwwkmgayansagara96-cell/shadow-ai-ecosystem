#!/bin/bash

echo "🚀 Building SHEDOW AI for Google Play Store..."

cd apps/android-app

# Clean previous builds
echo "🧹 Cleaning previous builds..."
./gradlew clean

# Build release AAB (Android App Bundle)
echo "🔨 Building AAB for Play Store..."
./gradlew bundleRelease

if [ $? -eq 0 ]; then
    echo "✅ AAB build successful!"
    echo "📱 AAB location: app/build/outputs/bundle/release/app-release.aab"
    echo ""
    echo "📤 Next steps:"
    echo "   1. Sign the AAB with your release keystore"
    echo "   2. Upload to Google Play Console"
    echo "   3. Set release notes and privacy policy"
    echo "   4. Submit for review"
else
    echo "❌ AAB build failed!"
    exit 1
fi
