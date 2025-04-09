const Contact = require("../models/Contact")
const asyncHandler = require('express-async-handler')

// @desc get all contacts
// @route get /api/contacts
// @access public

const getContacts = asyncHandler(async (req, res) => {
    const contacts = await Contact.find()
    res.status(200).json(contacts)

})

// @desc create contacts
// @route post /api/contacts
// @access public

const createContact = asyncHandler(async (req, res) => {
    const { name, email, phone, designation } = req.body
    if (!name || !email || !phone || !designation) {
        res.status(400);
        throw new Error("All Fields are required!")
    }
    const contact = await Contact.create({ name, email, phone, designation });
    res.status(201).json(contact);
});

// @desc get a contacts
// @route get /api/contacts/:id
// @access public

const getContact = asyncHandler(async (req, res) => {
    const contact = await Contact.findById(req.params.id)
    if (!contact) {
        res.status(404);
        throw new Error('Contact cannot found')
    }
    res.status(200).json(contact);

})

// @desc update contacts
// @route put /api/contacts/:id
// @access public

const updateContact = asyncHandler(async (req, res) => {
    const contact = await Contact.findById(req.params.id)
    if (!contact) {
        res.status(404);
        throw new Error('Contact cannot found')
    }
    const updateContact = await Contact.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
    )
    res.status(200).json(updateContact);
})

// @desc delete contact
// @route delete /api/contacts/:id
// @access public

const deleteContacts = asyncHandler(async (req, res) => {
    const contact = await Contact.findById(req.params.id)
    if (!contact) {
        res.status(404);
        throw new Error('Contact cannot found')
    }
    await Contact.deleteOne({ _id: req.params.id })
    res.status(200).json({ message: `Delete contacts ${req.params.id}` });
})

module.exports = { getContacts, createContact, getContact, updateContact, deleteContacts }