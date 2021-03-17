import * as Yup from 'yup';

import User from '../models/User';

class UsersController {
  async create(req, res) {
    // Validação dos dados vindo do Body
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      email: Yup.string().email().required(),
      password: Yup.string().required().min(6),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    // Valida se o user já está cadastrado do BD
    const userExists = await User.findOne({ where: { email: req.body.email } });

    if (userExists) {
      return res.status(400).json({ error: 'User already exists.' });
    }

    // Cria o user no BD
    const { id, name, email } = await User.create(req.body);

    return res.json({ id, name, email });
  }
}
export default new UsersController();
