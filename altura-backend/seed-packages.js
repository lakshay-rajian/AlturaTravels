import mongoose from "mongoose";
import dotenv from "dotenv";
import Package from "./models/Package.js";

dotenv.config();

const packages = [
  {
    name: "Nainital",
    description:
      "The “Lake District of India,” famous for its lakes, viewpoints, and peaceful hill vibes.",
    location: "Kumaon region, 285 km from Delhi",
    duration: "2–3 days",
    price: 6999,
    image: "",
  },
  {
    name: "Mussoorie",
    description:
      "The “Queen of Hills,” offering waterfalls, colonial charm, and scenic Himalayan views.",
    location: "Near Dehradun (35 km)",
    duration: "2–3 days",
    price: 7499,
    image: "",
  },
  {
    name: "Rishikesh",
    description:
      "A blend of spirituality and adventure on the banks of River Ganga.",
    location: "Dehradun district, near Haridwar",
    duration: "2–3 days",
    price: 5499,
    image: "",
  },
  {
    name: "Haridwar",
    description:
      "Holy city famous for Ganga Aarti and peaceful ghats, perfect for spiritual seekers.",
    location: "Foothills of the Shivalik range",
    duration: "1–2 days",
    price: 4999,
    image: "",
  },
  {
    name: "Auli",
    description:
      "Snow destination of Uttarakhand, surrounded by oak forests and mountain peaks.",
    location: "Chamoli district",
    duration: "3–4 days",
    price: 12999,
    image: "",
  },
  {
    name: "Jim Corbett National Park",
    description:
      "India’s oldest national park, known for jungle safaris and tiger sightings.",
    location: "Ramnagar, Nainital district",
    duration: "2–3 days",
    price: 7999,
    image: "",
  },
  {
    name: "Chopta",
    description:
      "Calm and scenic hill station known as “Mini Switzerland of India.”",
    location: "Rudraprayag district",
    duration: "2–3 days",
    price: 8499,
    image: "",
  },
  {
    name: "Valley of Flowers",
    description:
      "A mesmerizing valley blooming with rare Himalayan flowers during monsoon.",
    location: "Chamoli district",
    duration: "3–4 days",
    price: 11999,
    image: "",
  },
  {
    name: "Badrinath",
    description:
      "Sacred pilgrimage site dedicated to Lord Vishnu, one of the Char Dhams.",
    location: "Chamoli district",
    duration: "2–3 days",
    price: 8999,
    image: "",
  },
  {
    name: "Lansdowne",
    description:
      "A quiet British-era hill town ideal for a relaxing nature retreat.",
    location: "Pauri Garhwal district",
    duration: "2 days",
    price: 6499,
    image: "",
  },
];

async function run() {
  try {
    if (!process.env.MONGO_URI) {
      throw new Error("MONGO_URI is not set in .env");
    }
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Connected to MongoDB");

    for (const pkg of packages) {
      await Package.updateOne(
        { name: pkg.name },
        { $set: pkg },
        { upsert: true }
      );
      console.log(`Upserted: ${pkg.name}`);
    }

    console.log("Seeding completed.");
  } catch (err) {
    console.error("Seeding failed:", err);
  } finally {
    await mongoose.connection.close();
    console.log("MongoDB connection closed.");
  }
}

run();