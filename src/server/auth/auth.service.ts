import * as jwt from 'jsonwebtoken';
import * as bcrypt from 'bcryptjs';

import { User } from '../users/user/user';
import config from 'src/server/shared/config';

export class AuthService {
  async authenticate({ email, password }) {
    const user = await User.findOne({ email });

    // Compare password with user hash data
    if (user && bcrypt.compareSync(password, user.hash)) {
      // Take only user info to localStorage data
      const {
        hash,
        createdAt,
        updatedAt,
        ...userWithoutHash
      } = user.toObject();

      const token = jwt.sign({ sub: user.id }, config.secret);

      userWithoutHash.token = token;
      return userWithoutHash;
    }
  }
}
