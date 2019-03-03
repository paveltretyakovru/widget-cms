import * as bcrypt from 'bcryptjs';
import * as jwt from 'express-jwt';

import { User } from './user';

export class UserService {
	async create(userParams) {
		if (await User.findOne({ email: userParams.email })) {
			throw `User with a ${userParams.email} is exists`;
		}

		const user = new User(userParams);

		if (userParams.password) {
			user.hash = bcrypt.hashSync(userParams.password, 10);
		}

		await user.save();

		const { hash, ...userWithoutHash } = user.toObject();
		return userWithoutHash;
	}

	async getById(id) {
		return await User.findById(id).select('-hash');
	}
}
