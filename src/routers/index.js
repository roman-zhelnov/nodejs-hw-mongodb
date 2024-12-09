import express from 'express';
import contactsRouter from './contacts.js';
import authRouter from './auth.js';
const router = express.Router();

router.use('/auth', authRouter);
router.use('/contacts', contactsRouter);

export default router;
