import express from "express";
import morgan from "morgan";
import cors from "cors";
import dotenv from "dotenv";
import ConnectDB from "./config/database.js";
import adminRoutes from "./routes/Admin/adminRoutes.js";
import userRoutes from "./routes/User/userRoutes.js";
import commonRoute from './routes/common/commonRoute.js'


const app = express();
app.use(express.json());
app.use(morgan("dev"));
dotenv.config();
ConnectDB();

app.use(
  cors({
    origin: process.env.FRONTEND_URI || "http://localhost:3000",
    methods: ["GET", "POST", "PUT", "DELETE"],
  })
);




app.use("/api/admin/", adminRoutes);
app.use("/api/users/", userRoutes);
app.use ('/api/common/',commonRoute)

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
