import mongoose from "mongoose";
import dotenv from "dotenv";
import bcrypt from "bcryptjs";
dotenv.config();

// 2. Import Contact model
import Contact from "./src/models/Contact"; // adjust path if needed
import User from "./src/models/User";
import { IContact } from "../types/contact";

async function seed() {
  if (!process.env.MONGO_URI) {
    console.error("❌ MONGO_URI not set in .env");
    process.exit(1);
  }

  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("✅ Connected to MongoDB");

    console.group("🌱 Seeding Data");

    // Clear previous
    await User.deleteMany({});
    await Contact.deleteMany({});
    console.log("🧹 Cleared existing users and contacts");

    // Create 1 dummy user
    const passwordHash = await bcrypt.hash("securePassword123", 10);
    const user = await User.create({
      fullName: "Trupal Patel",
      email: "trupal.work@gmail.com",
      passwordHash,
    });
    console.log("👤 Created user:", user.fullName);

    const contacts = [
      {
        fullName: "Alice Johnson",
        email: "alice@acme.com",
        company: "Acme Corp",
        jobTitle: "Marketing Manager",
        phone: "+1-555-1234",
        address: "123 Main St, Cityville",
        website: "https://acme.com",
        linkedin: "https://linkedin.com/in/alicejohnson",
        department: "Marketing",
        industry: "Retail",
        notes: "Met at Tech Conference 2024",
        imageUri: "",
        userId: user._id,
      },
      {
        fullName: "Bob Smith",
        email: "bob@devlabs.io",
        company: "DevLabs",
        jobTitle: "Software Engineer",
        phone: "+1-555-5678",
        address: "456 Dev Way, Codeland",
        website: "https://devlabs.io",
        linkedin: "https://linkedin.com/in/bobsmith",
        department: "Engineering",
        industry: "Technology",
        notes: "Friend from university",
        imageUri: "",
        userId: user._id,
      },
      {
        fullName: "Carla Gomez",
        email: "carla@greenbuild.com",
        company: "GreenBuild",
        jobTitle: "Architect",
        phone: "+1-555-2233",
        address: "789 Arch St, Buildtown",
        website: "https://greenbuild.com",
        linkedin: "https://linkedin.com/in/carlagomez",
        department: "Design",
        industry: "Construction",
        notes: "Discussed sustainability projects",
        imageUri: "",
        userId: user._id,
      },
      {
        fullName: "Daniel Lee",
        email: "daniel@medisync.com",
        company: "MediSync",
        jobTitle: "Health IT Manager",
        phone: "+1-555-3344",
        address: "120 Health Blvd, MediCity",
        website: "https://medisync.com",
        linkedin: "https://linkedin.com/in/danlee",
        department: "IT",
        industry: "Healthcare",
        notes: "Interested in health data APIs",
        imageUri: "",
        userId: user._id,
      },
      {
        fullName: "Eva Chen",
        email: "eva@fashionlane.com",
        company: "Fashion Lane",
        jobTitle: "Creative Director",
        phone: "+1-555-7890",
        address: "88 Fashion Ave, NY",
        website: "https://fashionlane.com",
        linkedin: "https://linkedin.com/in/evachen",
        department: "Creative",
        industry: "Fashion",
        notes: "Lead for 2024 NY Fashion Week",
        imageUri: "",
        userId: user._id,
      },
      {
        fullName: "Frank Nilo",
        email: "frank@cybergrid.com",
        company: "CyberGrid",
        jobTitle: "Security Analyst",
        phone: "+1-555-9876",
        address: "222 Security Dr, SafeCity",
        website: "https://cybergrid.com",
        linkedin: "https://linkedin.com/in/franknilo",
        department: "Security",
        industry: "Cybersecurity",
        notes: "Recommended audit vendor",
        imageUri: "",
        userId: user._id,
      },
      {
        fullName: "Grace Hopper",
        email: "grace@compilers.com",
        company: "Compilers Inc.",
        jobTitle: "Lead Programmer",
        phone: "+1-555-3141",
        address: "999 Logic Cir, TechValley",
        website: "https://compilers.com",
        linkedin: "https://linkedin.com/in/gracehopper",
        department: "R&D",
        industry: "Software",
        notes: "Legacy systems expert",
        imageUri: "",
        userId: user._id,
      },
      {
        fullName: "Henry Park",
        email: "henry@finovate.com",
        company: "Finovate",
        jobTitle: "Product Manager",
        phone: "+1-555-1122",
        address: "12 Bank St, FinTech City",
        website: "https://finovate.com",
        linkedin: "https://linkedin.com/in/henrypark",
        department: "Product",
        industry: "Finance",
        notes: "Pitched mobile payment app",
        imageUri: "",
        userId: user._id,
      },
      {
        fullName: "Ivy Lau",
        email: "ivy@bioanalytics.org",
        company: "BioAnalytics",
        jobTitle: "Lab Researcher",
        phone: "+1-555-4455",
        address: "75 Gene Rd, Biotech Valley",
        website: "https://bioanalytics.org",
        linkedin: "https://linkedin.com/in/ivylau",
        department: "Biology",
        industry: "Biotech",
        notes: "In charge of genome project",
        imageUri: "",
        userId: user._id,
      },
      {
        fullName: "James Taylor",
        email: "james@audiowave.com",
        company: "AudioWave",
        jobTitle: "Sound Designer",
        phone: "+1-555-9090",
        address: "321 Studio Blvd, SoundCity",
        website: "https://audiowave.com",
        linkedin: "https://linkedin.com/in/jtaylor",
        department: "Audio",
        industry: "Entertainment",
        notes: "Collaborated on AR music project",
        imageUri: "",
        userId: user._id,
      },

      // Add 10 more for full 20

      {
        fullName: "Karen Wells",
        email: "karen@wellnessnow.org",
        company: "Wellness Now",
        jobTitle: "Nutrition Consultant",
        phone: "+1-555-5511",
        address: "7 Health Hill, FitCity",
        website: "https://wellnessnow.org",
        linkedin: "https://linkedin.com/in/karenwells",
        department: "Consulting",
        industry: "Health & Wellness",
        notes: "Met during wellness expo",
        imageUri: "",
        userId: user._id,
      },
      {
        fullName: "Liam Ng",
        email: "liam@logicocean.com",
        company: "Logic Ocean",
        jobTitle: "Backend Engineer",
        phone: "+1-555-2626",
        address: "808 Bit Blvd, DevCity",
        website: "https://logicocean.com",
        linkedin: "https://linkedin.com/in/liamng",
        department: "Backend",
        industry: "Cloud Computing",
        notes: "Referred by Bob Smith",
        imageUri: "",
        userId: user._id,
      },
      {
        fullName: "Maya Singh",
        email: "maya@brightideas.org",
        company: "Bright Ideas",
        jobTitle: "Innovation Strategist",
        phone: "+1-555-1717",
        address: "101 Idea Ln, Conceptville",
        website: "https://brightideas.org",
        linkedin: "https://linkedin.com/in/mayasingh",
        department: "Strategy",
        industry: "Think Tanks",
        notes: "Spoke at innovation summit",
        imageUri: "",
        userId: user._id,
      },
      {
        fullName: "Nathan Kim",
        email: "nathan@skyworks.com",
        company: "Skyworks",
        jobTitle: "Drone Operator",
        phone: "+1-555-7878",
        address: "555 Sky Ave, AeroCity",
        website: "https://skyworks.com",
        linkedin: "https://linkedin.com/in/nathankim",
        department: "Flight Ops",
        industry: "Aerospace",
        notes: "Demoed autonomous drone",
        imageUri: "",
        userId: user._id,
      },
      {
        fullName: "Olivia Hart",
        email: "olivia@legalhub.io",
        company: "LegalHub",
        jobTitle: "Contract Analyst",
        phone: "+1-555-3030",
        address: "400 Law Ln, LegalCity",
        website: "https://legalhub.io",
        linkedin: "https://linkedin.com/in/oliviahart",
        department: "Legal",
        industry: "Law",
        notes: "Helped revise startup agreement",
        imageUri: "",
        userId: user._id,
      },
      {
        fullName: "Paul Stone",
        email: "paul@builderpro.com",
        company: "BuilderPro",
        jobTitle: "Project Supervisor",
        phone: "+1-555-4949",
        address: "22 Site Rd, Buildtown",
        website: "https://builderpro.com",
        linkedin: "https://linkedin.com/in/paulstone",
        department: "Construction",
        industry: "Real Estate",
        notes: "Managed warehouse site",
        imageUri: "",
        userId: user._id,
      },
      {
        fullName: "Queenie Tran",
        email: "queenie@cultiv8.com",
        company: "Cultiv8",
        jobTitle: "AgTech Consultant",
        phone: "+1-555-1112",
        address: "88 Growth Ln, Agroville",
        website: "https://cultiv8.com",
        linkedin: "https://linkedin.com/in/queentran",
        department: "AgriTech",
        industry: "Agriculture",
        notes: "Runs smart farm pilots",
        imageUri: "",
        userId: user._id,
      },
      {
        fullName: "Ryan Ford",
        email: "ryan@mobility.io",
        company: "Mobility.io",
        jobTitle: "UX Designer",
        phone: "+1-555-8181",
        address: "212 App St, UX City",
        website: "https://mobility.io",
        linkedin: "https://linkedin.com/in/ryanford",
        department: "Design",
        industry: "Mobility",
        notes: "Focuses on accessibility",
        imageUri: "",
        userId: user._id,
      },
      {
        fullName: "Sofia Vega",
        email: "sofia@visiongrid.ai",
        company: "VisionGrid",
        jobTitle: "AI Researcher",
        phone: "+1-555-9292",
        address: "404 ML Ln, AITown",
        website: "https://visiongrid.ai",
        linkedin: "https://linkedin.com/in/sofiavega",
        department: "AI Lab",
        industry: "Artificial Intelligence",
        notes: "Working on neural visual pipelines",
        imageUri: "",
        userId: user._id,
      },
      {
        fullName: "Tom Yu",
        email: "tom@netwise.io",
        company: "NetWise",
        jobTitle: "Network Specialist",
        phone: "+1-555-6333",
        address: "55 Signal Way, InfraCity",
        website: "https://netwise.io",
        linkedin: "https://linkedin.com/in/tomyuu",
        department: "Infrastructure",
        industry: "Networking",
        notes: "Handles all routing configs",
        imageUri: "",
        userId: user._id,
      },
    ];

    await Contact.insertMany(contacts);
    console.log("📇 Inserted contacts:", contacts.length);

    console.groupEnd();
    console.log("✅ Done seeding!");
  } catch (err) {
    console.error("❌ Error seeding data:", err);
  } finally {
    await mongoose.disconnect();
    process.exit();
  }
}

seed();
