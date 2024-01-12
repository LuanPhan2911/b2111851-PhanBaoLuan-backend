import express from "express";
import cors from "cors";
const app = express();
app.use(cors());
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log("App listen with port: ", PORT);
});
