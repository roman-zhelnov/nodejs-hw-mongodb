import { isHttpError } from 'http-errors';

export const errorHandler = (error, _req, res, _next) => {
  if (isHttpError(error) === true) {
    return res
      .status(error.statusCode)
      .send({ status: error.statusCode, message: error.message });
  }
  console.error(error);

  res.status(500).send({
    status: 500,
    message: 'Something went wrong',
    data: error.message,
  });
};
