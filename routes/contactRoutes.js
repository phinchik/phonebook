const express = require("express");
const router = express.Router();
const { getContacts, createContact, getContact, updateContact, deleteContacts } = require("../controllers/contactController")

router.route("/").get(getContacts)

router.route("/").post(createContact)

router.route("/:id").get(getContact)

router.route("/:id").put(updateContact)

router.route("/:id").delete(deleteContacts)


module.exports = router