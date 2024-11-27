import createHttpError from 'http-errors';

export const notFoundHandler = (_req, _res, _next) => {
  throw new createHttpError[404]('Route not found');
};
