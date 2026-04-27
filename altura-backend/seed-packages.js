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
    image: "/uploads/1763920550580-29854599.jpg",
  },
  {
    name: "Mussoorie",
    description:
      "The “Queen of Hills,” offering waterfalls, colonial charm, and scenic Himalayan views.",
    location: "Near Dehradun (35 km)",
    duration: "2–3 days",
    price: 7499,
    image: "/uploads/1763920557297-698632507.jpg",
  },
  {
    name: "Rishikesh",
    description:
      "A blend of spirituality and adventure on the banks of River Ganga.",
    location: "Dehradun district, near Haridwar",
    duration: "2–3 days",
    price: 5499,
    image: "/uploads/1763920558211-736420159.jpg",
  },
  {
    name: "Haridwar",
    description:
      "Holy city famous for Ganga Aarti and peaceful ghats, perfect for spiritual seekers.",
    location: "Foothills of the Shivalik range",
    duration: "1–2 days",
    price: 4999,
    image: "/uploads/1763920558386-465271291.jpg",
  },
  {
    name: "Auli",
    description:
      "Snow destination of Uttarakhand, surrounded by oak forests and mountain peaks.",
    location: "Chamoli district",
    duration: "3–4 days",
    price: 12999,
    image: "/uploads/1763920558574-108138181.jpg",
  },
  {
    name: "Jim Corbett National Park",
    description:
      "India’s oldest national park, known for jungle safaris and tiger sightings.",
    location: "Ramnagar, Nainital district",
    duration: "2–3 days",
    price: 7999,
    image: "/uploads/1763920558770-847558582.jpg",
  },
  {
    name: "Chopta",
    description:
      "Calm and scenic hill station known as “Mini Switzerland of India.”",
    location: "Rudraprayag district",
    duration: "2–3 days",
    price: 8499,
    image: "/uploads/1763920558988-179095141.jpg",
  },
  {
    name: "Valley of Flowers",
    description:
      "A mesmerizing valley blooming with rare Himalayan flowers during monsoon.",
    location: "Chamoli district",
    duration: "3–4 days",
    price: 11999,
    image: "/uploads/1763920582646-602006845.jpg",
  },
  {
    name: "Badrinath",
    description:
      "Sacred pilgrimage site dedicated to Lord Vishnu, one of the Char Dhams.",
    location: "Chamoli district",
    duration: "2–3 days",
    price: 8999,
    image: "/uploads/1763920583062-996285353.jpg",
  },
  {
    name: "Lansdowne",
    description:
      "A quiet British-era hill town ideal for a relaxing nature retreat.",
    location: "Pauri Garhwal district",
    duration: "2 days",
    price: 6499,
    image: "/uploads/1763920583248-734870654.jpg",
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