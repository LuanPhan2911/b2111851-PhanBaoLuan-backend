import express from "express";
import { contactController } from "../controller/contact.controller.js";

const router = express.Router();
router
  .route("/")
  .post(contactController.create)
  .get(contactController.findAll)
  .delete(contactController.deleteAll);
router.route("/favorite").get(contactController.findAllFavorite);
router
  .route("/:id")
  .get(contactController.findOne)
  .put(contactController.update)
  .delete(contactController.delete);
export default router;
