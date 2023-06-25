const asyncHandler = require("express-async-handler");
const Contact = require("../models/contactModel")

//@desc get all contacts
//@route GET api/contacts
//access private
const getContacts = asyncHandler(async(req, res) => {
  const contacts = await Contact.find({user_id:req.user.id})
  res.status(200).json(contacts);
});

//@desc Create New contac
//@route POST /api/contacts
//@access private
const postContact = asyncHandler(async (req, res) => {
  console.log("The request body is:", req.body);
  const { name, email, phone } = req.body;
  if (!name || !email || !phone) {
    res.status(400);
    throw new Error("All fields are mandatory!");
  }
  try {
    const contact = await Contact.create({
      name,
      email,
      phone,
      user_id: req.user.id
    });
    res.status(201).json(contact);
  } catch (error) {
    console.error("Error creating contact:", error);
    res.status(500).json({ message: "Failed to create contact" });
  }
});


//@desc Get contact
//@route GET /api/contacts/:id
//@access private
const getContact = asyncHandler(async (req, res) => {
  const contactId = req.params.id;
  try {
    const contact = await Contact.findById(contactId);
    if (!contact) {
      return res.status(404).json({ message: 'Contact not found' });
    }
  res.status(200).json(contact);
  } catch (error) {
    console.error('Error retrieving contact:', error);
    res.status(500).json({ message: 'Failed to retrieve contact' });
  }
});



//@desc Update contact
//@route PUT /api/contacts/:id
//@access private
const updateContact = asyncHandler(async (req, res) => {
  const contact = await Contact.findById(req.params.id);
  if (!contact) {
    res.status(404);
    throw new Error("Contact not found");
  }

  if (contact.user_id.toString() !== req.user.id) {
    res.status(403);
    throw new Error("User don't have permission to update other user contacts");
  }

  const updatedContact = await Contact.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );

  res.status(200).json(updatedContact);
});

//@desc Delete contact
//@route DELETE /api/contacts/:id
//@access private
const deleteContact = asyncHandler(async (req, res) => {
  const contact = await Contact.findById(req.params.id);
  if (!contact) {
    res.status(404);
    throw new Error("Contact not found");
  }
  if (contact.user_id.toString() !== req.user.id) {
    res.status(403);
    throw new Error("User don't have permission to update other user contacts");
  }
  await Contact.deleteOne({ _id: req.params.id });
  res.status(200).json(contact);
});



module.exports = {
  getContact,
  postContact,
  updateContact,
  getContacts,
  deleteContact,
};
