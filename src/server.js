/* eslint-disable no-unused-vars */
import express from 'express';
import cors from 'cors';

const app = express();

app.use(cors());

app.get('/contacts', (req, res) => {
  res.send({ status: 200, data: ['Contacts'] });
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
