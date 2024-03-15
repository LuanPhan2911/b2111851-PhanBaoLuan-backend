import express from "express";
import cors from "cors";
import contactRouter from "./app/routes/contact.route.js";
import ApiError from "./app/api.error.js";
const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static("public"));
app.get("/", (req, res) => {
  return res.send("index.html");
});
app.use("/api/contact", contactRouter);
//handle error 404
app.use((req, res, next) => {
  return next(new ApiError(404, "Resource not found"));
});
//handle error from server
app.use((err, req, res, next) => {
  return res.status(err.statusCode || 500).json({
    message: err.message || "Internal Error from server!",
  });
});

export default app;
