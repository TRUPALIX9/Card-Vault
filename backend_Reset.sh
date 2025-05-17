#!/bin/bash

# 🔥 Delete existing backend folder
echo "🚮 Removing old backend..."
rm -rf backend

# 📁 Create new backend structure
echo "📁 Creating backend directory..."
mkdir -p backend/src/routes backend/src/models
cd backend

# 📦 Initialize npm and install dependencies
echo "📦 Initializing npm and installing dependencies..."
npm init -y > /dev/null

npm install express mongoose cors dotenv
npm install --save-dev typescript ts-node @types/node @types/express @types/cors

# 🛠 Create tsconfig.json
echo "🛠 Creating tsconfig.json..."
npx tsc --init > /dev/null
cat > tsconfig.json <<EOF
{
  "compilerOptions": {
    "target": "ES6",
    "module": "commonjs",
    "rootDir": "./src",
    "outDir": "./dist",
    "esModuleInterop": true,
    "strict": true,
    "skipLibCheck": true
  }
}
EOF

# 📝 Create .env file
echo "📝 Creating .env file..."
cat > .env <<EOF
PORT=5000
MONGO_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/cardvault
EOF

# 🧠 Create index.ts
echo "🧠 Creating src/index.ts..."
cat > src/index.ts <<EOF
import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";

import statusRoutes from "./routes/status";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI || "";

app.use(cors());
app.use(express.json());

app.use("/api/status", statusRoutes);

mongoose
  .connect(MONGO_URI)
  .then(() => {
    console.log("✅ MongoDB connected");
    app.listen(PORT, () => {
      console.log(\`🚀 Server running at http://localhost:\${PORT}/api/status\`);
    });
  })
  .catch((err) => {
    console.error("❌ MongoDB connection failed:", err);
    process.exit(1);
  });
EOF

# 🌐 Create status route
echo "🌐 Creating src/routes/status.ts..."
cat > src/routes/status.ts <<EOF
import express from "express";

const router = express.Router();

router.get("/", (_req, res) => {
  res.json({
    status: "ok",
    message: "Card Vault API is live ✅",
    timestamp: new Date().toISOString(),
  });
});

export default router;
EOF

# 🛠 Add run script to package.json
echo "🛠 Adding dev script to package.json..."
npx json -I -f package.json -e 'this.scripts={"dev":"ts-node src/index.ts"}' > /dev/null 2>&1 || {
  sed -i '' '/"scripts": {/a\
    "dev": "ts-node src/index.ts",
  ' package.json
}

echo "✅ Backend setup complete! Run it with: cd backend && npm run dev"
