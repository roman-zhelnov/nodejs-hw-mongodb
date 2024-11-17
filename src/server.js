/* eslint-disable no-unused-vars */
import express from 'express';
import cors from 'cors';
import logger from 'pino-http';
import { getAllContacts, getContactById } from './services/contacts.js';

const app = express();

app.use(cors());
app.use(logger());

app.get('/contacts', async (_req, res) => {
  const contacts = await getAllContacts();
  res.send({
    status: 200,
    message: 'Successfully found contacts!',
    data: contacts,
  });
});

app.get('/contacts/:id', async (req, res) => {
  const { id } = req.params;
  const contact = await getContactById(id);
  if (contact === null) {
    return res.status(404).send({ status: 404, message: 'Contact not found' });
  }
  res.send({
    status: 200,
    message: `Successfully found contact with id ${id}!`,
    data: contact,
  });
});

app.use('*', (req, res, _next) => {
  req.log.info(`${req.method}`);
  res.status(404).send({ status: 404, message: 'Not found' });
});

app.use((error, _req, res, _next) => {
  res.status(500).send({
    message: 'Something went wrong',
    error: error.message,
  });
});

export const setupServer = () => {
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
};
