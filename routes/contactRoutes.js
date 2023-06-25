const express = require("express");
const router = express.Router();
const { getContact, postContact, updateContact, deleteContact, getContacts}= require("../controllers/contactController");
const validateToken = require("../middleware/validateTokenHandler");
const app = express();


router.use(validateToken);

router.route("/").get(getContacts)

router.route("/").post(postContact)

router.route("/:id").put(updateContact)

router.route("/:id").delete(deleteContact)

router.route("/:id").get(getContact)

  

module.exports= router