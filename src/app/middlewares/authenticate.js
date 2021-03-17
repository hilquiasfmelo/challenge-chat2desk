import jwt from 'jsonwebtoken';
import { promisify } from 'util';

import authConfig from '../../config/auth';

export default async (request, response, next) => {
  const authHeader = request.headers.authorization;

  if (!authHeader) {
    return response.statu(401).json({ error: 'Token not provided.' });
  }

  // Dividi o Array e pega somente a numeração do token
  const [, token] = authHeader.split(' ');

  try {
    // Realiza a decodificação do token
    const decoded = await promisify(jwt.verify)(token, authConfig.secret);

    // Inseri no Request Global o ID do User
    request.userID = decoded.id;

    return next();
  } catch (error) {
    return response.status(401).json({ error: 'Token invalid.' });
  }
};
