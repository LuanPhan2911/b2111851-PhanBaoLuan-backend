import { MongoClient } from "mongodb";
import { ObjectId } from "mongodb";
class MongoDB {
  static connect = async (uri) => {
    if (this.client) {
      return this.client;
    } else {
      this.client = await MongoClient.connect(uri);
      return this.client;
    }
  };
}
export default MongoDB;
