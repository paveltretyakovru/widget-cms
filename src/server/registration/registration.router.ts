import { Router } from 'express';
import { RegistrationService } from './registration.service';

export const registrationRouter = Router({ mergeParams: true });

registrationRouter.post('/', (req, res, next) => {
	new RegistrationService().registrate(req.body)
		.then(user => res.json({
			data: user,
			success: true,
			message: 'Success registration'
		})).catch(err => next(err));
});
