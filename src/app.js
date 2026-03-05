import dotenv from "dotenv";

if (process.env.NODE_ENV === 'test') {
  dotenv.config({ path: ".env.test", override: true });
} else {
  dotenv.config({ override: true });
}

import express from "express";
import authRoutes from "./routes/authRoutes.js";
import taskRoutes from "./routes/taskRoutes.js";

const app = express();

app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/tasks", taskRoutes);

export default app;