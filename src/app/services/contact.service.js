class ContactService {
  constructor(client) {
    this.contact = client.db("contactbook").collection("contacts");
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
    Objects.keys(contact).forEach(
      (key) => !contact[key] && delete contact[key]
    );
    return contact;
  }
  async create(payload) {
    const contact = this.extractContactData(payload);
    const result = this.contact.findOneAndUpdate(
      contact,
      {
        $set: {
          favorite: contact.favorite === true,
        },
      },
      {
        returnDocument: "after",
        upsert: true,
      }
    );
    return result.value;
  }
}
export default ContactService;
