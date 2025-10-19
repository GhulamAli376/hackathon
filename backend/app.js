import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { dbConnection } from "./config/db.js";
import authRouter from "./routes/auth.js";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

dbConnection();

app.get("/", async (req, res) => {
  res.send("Server running successful");
});

app.use("/api/auth", authRouter);
// app.use("/api/restaurant", restaurantRouter);
// app.use("/api/image", uploadImage);
// app.use("/api/admin", adminRouter);
// app.use("/api/user", userRouter);

app.listen(PORT, () => {
  if (process.env.NODE_ENV !== "production") {
    console.log(`Server running on http://localhost:${PORT}`);
  }
});
export default app