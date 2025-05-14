#!/bin/bash

# Step 1: Remove existing folders
rm -rf client server frontend backend

echo "🧹 Removed old client/server folders..."

# Step 2: Create frontend (Expo + TypeScript)
npx create-expo-app frontend --template

echo "✅ Created frontend with Expo + TypeScript."

# Step 3: Create backend (Node.js + TypeScript)
mkdir -p backend/src/models backend/src/routes
cd backend

npm init -y
npm install express mongoose cors dotenv
npm install -D typescript ts-node-dev @types/node @types/express

npx tsc --init

# tsconfig.json
cat > tsconfig.json <<EOL
{
  "compilerOptions": {
    "target": "ES2020",
    "module": "CommonJS",
    "outDir": "dist",
    "rootDir": "src",
    "strict": true,
    "esModuleInterop": true
  }
}
EOL

# .env placeholder
cat > .env <<EOL
PORT=5000
MONGO_URI=mongodb+srv://<username>:<password>@cluster0.mongodb.net/card-vault
EOL

# Add start script
npx json -I -f package.json -e 'this.scripts={"dev":"ts-node-dev src/index.ts"}'

# index.ts
cat > src/index.ts <<EOL
import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import contactsRouter from './routes/contacts';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());
app.use('/api/contacts', contactsRouter);

const PORT = process.env.PORT || 5000;

mongoose.connect(process.env.MONGO_URI!)
  .then(() => {
    console.log('✅ Connected to MongoDB');
    app.listen(PORT, () => {
      console.log(\`🚀 Server running at http://localhost:\${PORT}\`);
    });
  })
  .catch((err) => {
    console.error('❌ MongoDB connection error:', err.message);
  });
EOL

# Contact.ts
cat > src/models/Contact.ts <<EOL
import mongoose from 'mongoose';

export interface IContact {
  fullName: string;
  email: string;
  company: string;
  jobTitle?: string;
  phone?: string;
  address?: string;
  website?: string;
  linkedin?: string;
  department?: string;
  industry?: string;
  notes?: string;
  imageUri?: string;
  scannedAt?: Date;
}

const ContactSchema = new mongoose.Schema<IContact>({
  fullName: { type: String, required: true },
  email: { type: String, required: true },
  company: { type: String, required: true },
  jobTitle: String,
  phone: String,
  address: String,
  website: String,
  linkedin: String,
  department: String,
  industry: String,
  notes: String,
  imageUri: String,
  scannedAt: { type: Date, default: Date.now }
});

export default mongoose.model<IContact>('Contact', ContactSchema);
EOL

# contacts.ts
cat > src/routes/contacts.ts <<EOL
import express from 'express';
import Contact from '../models/Contact';

const router = express.Router();

router.post('/', async (req, res) => {
  try {
    const contact = new Contact(req.body);
    await contact.save();
    res.status(201).json(contact);
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
});

router.get('/', async (_req, res) => {
  const contacts = await Contact.find().sort({ scannedAt: -1 });
  res.json(contacts);
});

export default router;
EOL

cd ..

echo "✅ backend/ fully set up."

echo ""
echo "🎉 Setup complete! Next steps:"
echo "👉 Run backend:"
echo "   cd backend && npm install && npm run dev"
echo "👉 Run frontend:"
echo "   cd frontend && npm install && npx expo start"
