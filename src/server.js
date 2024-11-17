/* eslint-disable no-unused-vars */
import express from 'express';
import cors from 'cors';
import { getAllContacts, getContactById } from './services/contacts.js';

const app = express();

app.use(cors());

app.get('/contacts', async (req, res) => {
  const contacts = await getAllContacts();
  res.send({
    status: 200,
    message: 'Successfully found contacts!',
    data: contacts,
  });
});

app.get('/contacts/:id', (req, res) => {
  const { id } = req.params;
  res.send({ status: 200, data: `Contact ${id}` });
});

app.use((_req, res, _next) => {
  res.status(404).send({ status: 404, message: 'Not found' });
});

export const setupServer = () => {
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
};
