#!/bin/bash

echo "🔐 Signing APK for production..."

if [ ! -f "release.keystore" ]; then
    echo "❌ release.keystore not found!"
    echo "Generate keystore first:"
    echo "keytool -genkey -v -keystore release.keystore -keyalg RSA -keysize 2048 -validity 10000 -alias shedow"
    exit 1
fi

echo "📝 Signing app-release.aab..."
jarsigner -verbose -sigalg SHA1withRSA -digestalg SHA1 \
    -keystore release.keystore \
    android/app/build/outputs/bundle/release/app-release.aab shedow

echo "✅ APK signed successfully!"
echo "📱 Ready for Google Play Store"
