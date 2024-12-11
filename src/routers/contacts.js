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

router.get('/', ctrlWrapper(getContactsController));

router.get('/:id', isValidId, ctrlWrapper(getContactByIdController));

router.post(
  '/',
  jsonParser,
  validateBody(contactSchemaForValid),
  ctrlWrapper(createContactController),
);

router.patch(
  '/:id',
  isValidId,
  jsonParser,
  validateBody(replaceContactSchema),
  ctrlWrapper(updateContactController),
);

router.delete('/:id', isValidId, ctrlWrapper(deleteContactController));

export default router;
