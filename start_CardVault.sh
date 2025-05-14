#!/bin/bash

# Exit on errors
set -e

# Colors
GREEN='\033[0;32m'
CYAN='\033[0;36m'
NC='\033[0m' # No Color

echo -e "${GREEN}🚀 Starting Card Vault Development Server...${NC}"

# Start backend
echo -e "${CYAN}▶ Starting Backend...${NC}"
cd backend
npx ts-node-dev src/index.ts &
BACKEND_PID=$!

# Start frontend
cd ../frontend
echo -e "${CYAN}📱 Starting Frontend (Expo)...${NC}"
npx expo start &

# Capture Expo PID if needed (not killing for now)
# FRONTEND_PID=$!

# Wait for background processes to end
trap "echo -e '\n🛑 Exiting...'; kill $BACKEND_PID; exit 0" SIGINT

# Keep script alive
wait
