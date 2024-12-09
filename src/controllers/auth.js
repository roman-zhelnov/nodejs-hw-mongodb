import { registerUser, loginUser } from '../services/auth.js';

export const registerController = async (req, res) => {
  const payload = {
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
  };

  const registeredUser = await registerUser(payload);

  res.send({
    status: 200,
    message: 'Successfully registered a user!',
    data: registeredUser,
  });
};

export const loginController = async (req, res) => {
  const { email, password } = req.body;

  await loginUser(email, password);
  res.send({
    status: 200,
    message: 'Successfully logged in an user!',
  });
};
