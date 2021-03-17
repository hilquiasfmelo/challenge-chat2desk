import * as Yup from 'yup';
import jwt from 'jsonwebtoken';

import User from '../models/User';
import authConfig from '../../config/auth';

class SessionsController {
  async create(request, response) {
    // Validação dos dados vindo do Body
    const schema = Yup.object().shape({
      email: Yup.string().email().required(),
      password: Yup.string().required().min(6),
    });

    if (!(await schema.isValid(request.body))) {
      return response.status(400).json({ error: 'Validation fails.' });
    }

    const { email, password } = request.body;

    // Verifica se o user que está tentando logar existe no BD
    const user = await User.findOne({
      where: { email },
    });

    if (!user) {
      return response.status(401).json({ error: 'User not found.' });
    }

    /* Testa se o password bate com a cadastrada no BD */
    if (!(await user.checkPassword(password))) {
      return response.status(401).json({ error: 'Password does not match.' });
    }

    const { id, name } = user;

    const { secret, expiresIn } = authConfig;

    // Retorna o user logado e com seu token de login
    return response.json({
      user: {
        id,
        name,
        email,
      },
      token: jwt.sign({ id }, secret, {
        expiresIn,
      }),
    });
  }
}

export default new SessionsController();
