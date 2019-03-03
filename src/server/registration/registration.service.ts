import { User } from '../users/user/user';
import { UserService } from '../users/user/user.service';

export class RegistrationService {
	registrate(userData) {
		const userService = new UserService();
		
		const user = userService.create(userData);
		return user;
	}
}
