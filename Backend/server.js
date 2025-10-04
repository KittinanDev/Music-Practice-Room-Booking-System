import express from "express";
import cors from "cors";
import connectDB from "./config/db.js";
import bookingRoutes from "./routes/bookingRoutes.js";

const app = express();
connectDB();

app.use(cors());
app.use(express.json());

app.use("/api/bookings", bookingRoutes);

const PORT = 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
