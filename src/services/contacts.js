import { Contact } from '../models/contact.js';

export const getAllContacts = async () => {
  const contacts = await Contact.find();
  return contacts;
};

export const getContactById = async (id) => {
  const contactById = await Contact.findById(id);
  return contactById;
};
