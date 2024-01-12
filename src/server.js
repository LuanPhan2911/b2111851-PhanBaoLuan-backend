import app from "./app.js";
import { config } from "./app/config/index.js";
const PORT = config.app.port;
app.get("/", (req, res) => {
  return res.json({
    text: "Hello world from express!",
  });
});
app.listen(PORT, () => {
  console.log("App listen with port: ", PORT);
});
