#!/bin/bash

echo "🚀 Starting Card-Vault project..."

# Check backend .env
if [ ! -f "server/.env" ]; then
  echo "❌ Missing server/.env file. Please create it with MongoDB and Cloudinary credentials."
  exit 1
fi

# Check for node_modules in server
if [ ! -d "server/node_modules" ]; then
  echo "📦 Installing backend dependencies..."
  cd server && npm install && cd ..
fi

# Check for client dependencies
if [ ! -d "client/node_modules" ]; then
  echo "📦 Installing frontend dependencies..."
  cd client && npm install && cd ..
fi

# Start backend
echo "🔧 Starting backend..."
cd server
node server.js &
SERVER_PID=$!
cd ..

# Start frontend (Expo)
echo "📱 Starting Expo frontend..."
cd client
npx expo start &

echo "✅ Card-Vault is running!"
echo "🧩 Backend PID: $SERVER_PID"
