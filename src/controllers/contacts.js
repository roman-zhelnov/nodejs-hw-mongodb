import * as fs from 'node:fs/promises';
import {
  getAllContacts,
  getContactById,
  createContact,
  deleteContact,
  updateContact,
} from '../services/contacts.js';
import createHttpError from 'http-errors';
import { parsePaginationParams } from '../utils/parsePaginationParams.js';
import { parseSortParams } from '../utils/parseSortParams.js';
import { parseFilterParams } from '../utils/parseFilterParams.js';
import { uploadToCloudinary } from '../utils/uploadToCloudinary.js';

export const getContactsController = async (req, res) => {
  const { page, perPage } = parsePaginationParams(req.query);
  const { sortBy, sortOrder } = parseSortParams(req.query);
  const filter = parseFilterParams(req.query);

  const contacts = await getAllContacts({
    page,
    perPage,
    sortBy,
    sortOrder,
    filter,
    userId: req.user._id,
  });

  res.send({
    status: 200,
    message: 'Successfully found contacts!',
    data: contacts,
  });
};

export const getContactByIdController = async (req, res) => {
  const { id } = req.params;

  const contact = await getContactById(id, req.user._id);
  if (!contact) {
    throw new createHttpError[404]('Contact not found');
  }

  res.send({
    status: 200,
    message: `Successfully found contact with id ${id}!`,
    data: contact,
  });
};

export const createContactController = async (req, res) => {
  let photo = null;
  if (req.file) {
    const result = await uploadToCloudinary(req.file.path);

    await fs.unlink(req.file.path);
    photo = result.secure_url;
  }

  const contact = {
    name: req.body.name,
    phoneNumber: req.body.phoneNumber,
    email: req.body.email,
    isFavourite: req.body.isFavourite,
    contactType: req.body.contactType,
    userId: req.user._id,
    photo,
  };

  const result = await createContact(contact);
  res.status(201).send({
    status: 201,
    message: 'Successfully created a contact!',
    data: result,
  });
};

export const updateContactController = async (req, res) => {
  const { id } = req.params;
  let photo = null;
  if (req.file) {
    const result = await uploadToCloudinary(req.file.path);

    await fs.unlink(req.file.path);
    photo = result.secure_url;
  }

  const contact = {
    name: req.body.name,
    phoneNumber: req.body.phoneNumber,
    email: req.body.email,
    isFavourite: req.body.isFavourite,
    contactType: req.body.contactType,
    photo,
  };

  const result = await updateContact(id, contact, req.user._id);

  if (result === null) {
    throw new createHttpError[404]('Contact not found');
  }

  res.status(200).send({
    status: 200,
    message: 'Successfully patched a contact!',
    data: result,
  });
};

export const deleteContactController = async (req, res) => {
  const { id } = req.params;
  const result = await deleteContact(id, req.user._id);

  if (result === null) {
    throw new createHttpError[404]('Contact not found');
  }

  res.status(204).send();
};
