import mongoose from "mongoose";
import dotenv from "dotenv";
import Blog from "./models/Blog.js";

dotenv.config();

const blogs = [
  {
    title: "Top 10 Places to Visit in Nainital",
    content: "Nainital is a beautiful hill station in the Indian state of Uttarakhand. Here are the top 10 places to visit in Nainital...",
    author: "Admin",
    image: "/uploads/1763920550580-29854599.jpg",
  },
  {
    title: "Adventure in Rishikesh",
    content: "Rishikesh is the adventure capital of India. From river rafting to bungee jumping, there is so much to do...",
    author: "Admin",
    image: "/uploads/1763920558211-736420159.jpg",
  }
];

async function run() {
  try {
    if (!process.env.MONGO_URI) {
      throw new Error("MONGO_URI is not set in .env");
    }
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Connected to MongoDB");

    for (const blog of blogs) {
      await Blog.updateOne(
        { title: blog.title },
        { $set: blog },
        { upsert: true }
      );
      console.log(`Upserted Blog: ${blog.title}`);
    }

    console.log("Blog seeding completed.");
  } catch (err) {
    console.error("Seeding failed:", err);
  } finally {
    await mongoose.connection.close();
    console.log("MongoDB connection closed.");
  }
}

run();
