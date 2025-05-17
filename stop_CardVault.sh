#!/bin/bash

echo "🛑 Stopping Card Vault Dev Servers..."

# Kill ts-node-dev backend process
pkill -f "ts-node-dev src/index.ts"

# Kill Expo process
pkill -f "expo start"

echo "✅ All dev servers stopped."
