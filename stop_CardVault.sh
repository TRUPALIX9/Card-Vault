#!/bin/bash

echo "🛑 Stopping Card-Vault backend (if running)..."

# Kill Node.js backend on port 5000
PORT=5000
PID=$(lsof -ti tcp:$PORT)

if [ -n "$PID" ]; then
  kill -9 $PID
  echo "✅ Backend (port $PORT) stopped."
else
  echo "⚠️ Backend not running on port $PORT."
fi
