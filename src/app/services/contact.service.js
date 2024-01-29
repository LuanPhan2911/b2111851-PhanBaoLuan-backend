import { ObjectId } from "mongodb";

class ContactService {
  constructor(client) {
    this.contact = client.db().collection("contacts");
  }
  extractContactData(payload) {
    const contact = {
      name: payload.name,
      email: payload.email,
      address: payload.address,
      phone: payload.phone,
      favorite: payload.favorite,
    };
    // Remove undefined fields
    Object.keys(contact).forEach(
      (key) =>
        (contact[key] == null || contact[key] === undefined) &&
        delete contact[key]
    );
    return contact;
  }
  async create(payload) {
    const contact = this.extractContactData(payload);
    const result = await this.contact.findOneAndUpdate(
      contact,
      { $set: { favorite: contact.favorite === true } },
      { returnDocument: "after", upsert: true }
    );
    return result;
  }
  async find(filter) {
    let cursor = await this.contact.find(filter);
    return await cursor.toArray();
  }
  async findByName(name) {
    let cursor = await this.contact.find({
      name: { $regex: new RegExp(name), $options: "i" },
    });
    return await cursor.toArray();
  }
  async findOne(id) {
    return await this.contact.findOne({
      _id: ObjectId.isValid(id) ? new ObjectId(id) : null,
    });
  }
  async update({ _id, data }) {
    if (ObjectId.isValid(_id)) {
      _id = new ObjectId(_id);
      console.log(data);
      const updateData = this.extractContactData(data);

      const result = await this.contact.findOneAndUpdate(
        {
          _id,
        },
        {
          $set: updateData,
        },
        {
          returnDocument: "after",
        }
      );
      return result;
    }
    return null;
  }
  async delete({ _id }) {
    return this.contact.findOneAndDelete({
      _id: ObjectId.isValid(_id) ? new ObjectId(_id) : null,
    });
  }
  async findFavorite() {
    let cursor = await this.contact.find({
      favorite: true,
    });
    return await cursor.toArray();
  }
  async deleteAll() {
    const result = await this.contact.deleteMany({});
    return result.deletedCount;
  }
}
export default ContactService;
