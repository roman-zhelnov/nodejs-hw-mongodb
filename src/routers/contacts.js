import express from 'express';
import {
  getContactByIdController,
  getContactsController,
  createContactController,
  deleteContactController,
  updateContactController,
} from '../controllers/contacts.js';

import { validateBody } from '../middlewares/validateBody.js';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import { isValidId } from '../middlewares/isValidId.js';
import {
  contactSchemaForValid,
  replaceContactSchema,
} from '../validation/contact.js';

const router = express.Router();
const jsonParser = express.json();

router.get('/contacts', ctrlWrapper(getContactsController));

router.get('/contacts/:id', isValidId, ctrlWrapper(getContactByIdController));

router.post(
  '/contacts',
  jsonParser,
  validateBody(contactSchemaForValid),
  ctrlWrapper(createContactController),
);

router.patch(
  '/contacts/:id',
  isValidId,
  jsonParser,
  validateBody(replaceContactSchema),
  ctrlWrapper(updateContactController),
);

router.delete('/contacts/:id', isValidId, ctrlWrapper(deleteContactController));

export default router;
