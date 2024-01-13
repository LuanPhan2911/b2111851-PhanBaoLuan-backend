import express from "express";
import cors from "cors";
import contactRouter from "./app/routes/contact.route.js";
const app = express();
app.use(cors());
app.use(express.json());
app.use("/api/contact", contactRouter);

export default app;
