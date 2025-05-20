Got it, Trupal! Here's your **all-in-one `README.md` file** for the **Card Vault frontend** — complete with:

* 📘 Project Overview
* ✨ Features
* 📂 How it Works
* 🛠️ Installation & Running
* ⚙️ Environment Setup
* 🔗 API Integration
* 📦 Build Process (EAS)
* 🚧 Planned Features
* 📱 Platform Info
* 👤 Author Info
* 📄 License & Credits

---

### ✅ Save this as `README.md` in your `card-vault-frontend` root directory:

````markdown
# 📇 Card Vault – React Native Frontend

**Card Vault** is a cross-platform mobile app built with **React Native (Expo) + TypeScript** that allows users to **scan business cards**, extract contact details using OCR + AI, and store/manage contacts locally or through a backend powered by Node.js + MongoDB.

---

## ✨ Features

- 📸 Capture business card using the camera
- 🧠 OCR processing powered by backend (Tesseract.js)
- 🔍 AI/Regex-based contact extraction (name, phone, email, company, address)
- 💾 Save and list contacts locally (AsyncStorage or MMKV)
- ☁️ Optional cloud sync with backend
- 🌓 Dark & Light theme support (react-native-paper)
- 🧭 Expo Router for navigation
- 📦 Production-ready via EAS Build (Android & iOS)

---

## 📂 How It Works

1. User opens the **Scan** screen.
2. Captures an image of a business card using the camera.
3. Image is converted to base64 and sent to the backend via `/ocrExtract`.
4. OCR is performed and contact fields are extracted via regex or Hugging Face API.
5. User can view, edit, and save the contact.
6. Contacts are stored locally or synced to the backend (MongoDB).

---

## ⚙️ Environment Setup

### 1. Create `.env` file

```env
EXPO_PUBLIC_API_URL=http://<your-local-ip>:5091
````

> Replace `<your-local-ip>` with your backend server's local IP address. This allows your device to access the backend while on the same network.

---

## 🛠️ How to Run the App Locally

### Step 1: Clone the Repo

```bash
git clone https://github.com/TRUPALIX9/card-vault-frontend.git
cd card-vault-frontend
```

### Step 2: Install Dependencies

```bash
npm install
# or
yarn
```

### Step 3: Start Expo Development Server

```bash
npx expo start
```

### Step 4: Launch on Platform

* Press `a` → Launch on Android device or emulator
* Press `i` → Launch on iOS simulator (Mac only)
* Press `w` → Run in Web browser

> Make sure your mobile device is on the same network as your computer if testing on physical device.

---

## 🔗 OCR API Integration

Frontend connects to the following backend endpoint:

### Endpoint

```http
POST /ocrExtract
```

### Request Payload

```json
{
  "base64": "<base64_image_data>"
}
```

### Example Response

```json
{
  "text": "Extracted text from OCR",
  "data": {
    "name": "Jane Smith",
    "email": "jane@example.com",
    "phone": "+1 123 456 7890",
    "company": "Tech Co",
    "address": "456 Innovation Drive, CA"
  }
}
```

> The backend must return both raw OCR text and a `data` object with extracted fields.

---

## 🚀 How to Build for Production (EAS Build)

You can generate Android/iOS builds using **EAS Build**:

### Step 1: Install EAS CLI

```bash
npm install -g eas-cli
```

### Step 2: Configure Build Profiles

Add this to `eas.json`:

```json
{
  "build": {
    "production": {
      "developmentClient": false,
      "distribution": "store"
    }
  }
}
```

### Step 3: Build

* For Android:

```bash
eas build -p android --profile production
```

* For iOS:

```bash
eas build -p ios --profile production
```

> iOS builds require Apple Developer credentials and a Mac.

---

## 🧭 Platform Support

| Platform | Supported  | Notes                                         |
| -------- | ---------- | --------------------------------------------- |
| Android  | ✅ Yes      | Tested with Expo Go + APK build               |
| iOS      | ✅ Yes      | Tested via simulator and device               |
| Web      | ⚠️ Partial | OCR may not work consistently on all browsers |

---

## 🚧 Planned Features

* [ ] MMKV storage support for faster local reads
* [ ] QR code & NFC contact sharing
* [ ] Offline OCR fallback with local model
* [ ] Tagging, categories & search
* [ ] Cloud sync & user login

---

## 👤 Author

**Trupal Patel**
📧 Email: [trupal.work@gmail.com](mailto:trupal.work@gmail.com)
🔗 GitHub: [@TRUPALIX9](https://github.com/TRUPALIX9)

---

## 📄 License

MIT License © 2025 Trupal Patel

---

## 🙌 Acknowledgements

* [Tesseract.js](https://github.com/naptha/tesseract.js)
* [Hugging Face Transformers](https://huggingface.co/)
* [React Native Paper](https://callstack.github.io/react-native-paper/)
* [Expo](https://expo.dev/)
* [MMKV Storage](https://github.com/mrousavy/react-native-mmkv)

```
```
