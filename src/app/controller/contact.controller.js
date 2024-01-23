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
      return res.json({
        data: document,
      });
    } catch (error) {
      next(error);
    }
  },
  findOne: async (req, res, next) => {
    try {
      let { id } = req.params;
      const contactService = new ContactService(MongoDB.client);
      const document = await contactService.findOne(id);
      if (!document) {
        throw new ApiError(404, "Contact not found");
      }
      return res.json({
        data: document,
      });
    } catch (error) {
      next(
        new ApiError(
          500,
          error.message ?? `Error retrieving with contact id=${req.params.id}`
        )
      );
    }
  },
  findAll: async (req, res, next) => {
    let documents = [];
    const contactService = new ContactService(MongoDB.client);
    try {
      let { name } = req.query;
      if (name) {
        documents = await contactService.findByName(name);
      } else {
        documents = await contactService.find({});
      }
      return res.json({
        data: documents,
      });
    } catch (error) {
      next(new ApiError(500, "Error from get contacts"));
    }
  },
  findAllFavorite: async (req, res, next) => {
    const contactService = new ContactService(MongoDB.client);
    try {
      let documents = await contactService.findFavorite();

      return res.json({
        data: documents,
      });
    } catch (error) {
      next(new ApiError(500, "Error from get contacts"));
    }
  },
  update: async (req, res, next) => {
    try {
      if (Object.keys(req.body).length === 0) {
        throw new ApiError(400, "Can not update with empty data");
      }
      let { id } = req.params;
      const contactService = new ContactService(MongoDB.client);
      const document = await contactService.update({
        _id: id,
        data: req.body,
      });
      if (!document) {
        throw new ApiError(404, "Contact not found");
      }
      return res.json({
        data: document,
      });
    } catch (error) {
      next(new ApiError(500, error.message ?? "Error update"));
    }
  },
  delete: async (req, res, next) => {
    try {
      let { id } = req.params;
      const contactService = new ContactService(MongoDB.client);
      const document = await contactService.delete({
        _id: id,
      });
      if (!document) {
        throw new ApiError(404, "Contact not found");
      }
      return res.json({
        message: "Delete contact success",
        data: document,
      });
    } catch (error) {
      next(new ApiError(500, error.message ?? "Error delete"));
    }
  },
  deleteAll: async (req, res, next) => {
    try {
      const contactService = new ContactService(MongoDB.client);
      const deletedContact = await contactService.deleteAll();
      return res.json({
        message: `${deletedContact} contact deleted success`,
      });
    } catch (error) {
      next(new ApiError(500, error.message ?? "Error delete"));
    }
  },
};
export { contactController };
