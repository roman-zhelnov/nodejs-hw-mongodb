import express from 'express';
import {
  getContactByIdController,
  getContactsController,
  createContactController,
  deleteContactController,
  updateContactController,
} from '../controllers/contacts.js';

import { ctrlWrapper } from '../utils/ctrlWrapper.js';

const router = express.Router();
const jsonParser = express.json();

router.get('/contacts', ctrlWrapper(getContactsController));

router.get('/contacts/:id', ctrlWrapper(getContactByIdController));

router.post('/contacts', jsonParser, ctrlWrapper(createContactController));

router.patch('/contacts/:id', jsonParser, ctrlWrapper(updateContactController));

router.delete('/contacts/:id', ctrlWrapper(deleteContactController));

export default router;
