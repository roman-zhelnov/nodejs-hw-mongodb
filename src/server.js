import * as fs from 'node:fs';
import express from 'express';
import swaggerUI from 'swagger-ui-express';
import path from 'node:path';
import cors from 'cors';
import pino from 'pino-http';
import cookieParser from 'cookie-parser';

import { notFoundHandler } from './middlewares/notFoundHandler.js';
import { errorHandler } from './middlewares/errorHandler.js';
import router from './routers/index.js';

const swaggerDoc = JSON.parse(
  fs.readFileSync(path.resolve('docs/swagger.json')),
);

const app = express();

app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerDoc));

app.use(cors());
app.use(cookieParser());
app.use(
  pino({
    transport: {
      target: 'pino-pretty',
    },
  }),
);

app.use(router);

app.use(notFoundHandler);

app.use(errorHandler);

export const setupServer = () => {
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
};
