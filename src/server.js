/* eslint-disable no-unused-vars */
import express from 'express';
import cors from 'cors';
import pino from 'pino-http';
import contactsRouter from './routers/contacts.js';
import { notFoundHandler } from './middlewares/notFoundHandler.js';
import { errorHandler } from './middlewares/errorHandler.js';

const app = express();

app.use(cors());
app.use(
  pino({
    transport: {
      target: 'pino-pretty',
    },
  }),
);

app.use(contactsRouter);

app.use(notFoundHandler);

app.use(errorHandler);

export const setupServer = () => {
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
};
