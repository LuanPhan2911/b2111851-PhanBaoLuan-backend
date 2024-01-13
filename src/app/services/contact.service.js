class ContactService {
  constructor(client) {
    this.contact = client.db().collection("contacts");
  }
}
