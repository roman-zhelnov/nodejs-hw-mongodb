import {
  getAllContacts,
  getContactById,
  createContact,
  deleteContact,
  updateContact,
} from '../services/contacts.js';
import createHttpError from 'http-errors';

export const getContactsController = async (_req, res) => {
  const contacts = await getAllContacts();
  res.send({
    status: 200,
    message: 'Successfully found contacts!',
    data: contacts,
  });
};

export const getContactByIdController = async (req, res) => {
  const { id } = req.params;
  const contact = await getContactById(id);
  if (contact === null) {
    throw new createHttpError[404]('Contact not found');
  }
  res.send({
    status: 200,
    message: `Successfully found contact with id ${id}!`,
    data: contact,
  });
};

export const createContactController = async (req, res) => {
  const contact = {
    name: req.body.name,
    phoneNumber: req.body.phoneNumber,
    email: req.body.email,
    isFavourite: req.body.isFavourite,
    contactType: req.body.contactType,
  };

  const result = await createContact(contact);
  res
    .status(201)
    .send({
      status: 201,
      message: 'Successfully created a contact!',
      data: result,
    });
};

export const updateContactController = async (req, res) => {
  const { id } = req.params;
  const contact = {
    name: req.body.name,
    phoneNumber: req.body.phoneNumber,
    email: req.body.email,
    isFavourite: req.body.isFavourite,
    contactType: req.body.contactType,
  };

  const result = await updateContact(id, contact);

  if (result === null) {
    throw new createHttpError[404]('Contact not found');
  }

  res
    .status(200)
    .send({
      status: 200,
      message: 'Successfully patched a contact!',
      data: result,
    });
};

export const deleteContactController = async (req, res) => {
  const { id } = req.params;
  const result = await deleteContact(id);

  if (result === null) {
    throw new createHttpError[404]('Contact not found');
  }

  res.status(204).send();
};
