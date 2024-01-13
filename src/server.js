import app from "./app.js";
import { config } from "./app/config/index.js";
import MongoDB from "./app/utils/mongodb.util.js";

async function startServer() {
  try {
    await MongoDB.connect(config.db.uri);
    console.log("DB connected");
    const PORT = config.app.port;
    app.listen(PORT, () => {
      console.log("App listen with port: ", PORT);
    });
  } catch (error) {
    console.log("Connected to db error");
    process.exit();
  }
}
startServer();
