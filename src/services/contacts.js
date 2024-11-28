import { Contact } from '../models/contact.js';

export const getAllContacts = async () => {
  const contacts = await Contact.find();
  return contacts;
};

export const getContactById = async (id) => {
  const contactById = await Contact.findById(id);
  return contactById;
};

export const createContact = async (contact) => {
  return await Contact.create(contact);
};

export const updateContact = async (id, contact) => {
  return await Contact.findByIdAndUpdate(id, contact, { new: true });
};

export const deleteContact = async (id) => {
  return await Contact.findByIdAndDelete(id);
};
