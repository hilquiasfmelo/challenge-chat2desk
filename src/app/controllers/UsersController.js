import * as Yup from 'yup';

import User from '../models/User';

class UsersController {
  async create(request, response) {
    // Validação dos dados vindo do Body
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      email: Yup.string().email().required(),
      password: Yup.string().required().min(6),
    });

    if (!(await schema.isValid(request.body))) {
      return response.status(400).json({ error: 'Validation fails' });
    }

    // Valida se o user já está cadastrado do BD
    const userExists = await User.findOne({
      where: { email: request.body.email },
    });

    if (userExists) {
      return response.status(400).json({ error: 'User already exists.' });
    }

    // Cria o user no BD
    const { id, name, email } = await User.create(request.body);

    return response.json({ id, name, email });
  }
}
export default new UsersController();
