import ApiError from "../api.error.js";
import ContactService from "../services/contact.service.js";
import MongoDB from "../utils/mongodb.util.js";

const contactController = {
  create: async (req, res, next) => {
    if (!req.body?.name) {
      next(new ApiError(400, "Name can not be empty"));
    }
    try {
      const contactService = new ContactService(MongoDB.client);
      const document = await contactService.create(req.body);
      return res.send(document);
    } catch (error) {
      next(error);
    }
  },
  findOne: (req, res) => {},
  findAll: (req, res) => {},
  findAllFavorite: (req, res) => {},
  update: (req, res) => {},
  delete: (req, res) => {},
  deleteAll: (req, res) => {},
};
export { contactController };
