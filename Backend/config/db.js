import mongoose from "mongoose";

const connectDB = async () => {
  try {
    await mongoose.connect(
      "mongodb+srv://KittinanDev:Kittinan101@soi7dev.vfh7wn1.mongodb.net/music_room_booking?retryWrites=true&w=majority&appName=Soi7Dev"
    );
    console.log("✅ MongoDB Connected");
  } catch (error) {
    console.error("❌ DB Connection Failed", error.message);
    process.exit(1);
  }
};

export default connectDB;
