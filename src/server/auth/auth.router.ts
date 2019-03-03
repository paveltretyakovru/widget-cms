import { Router } from 'express';
import { AuthService } from './auth.service';

export const authRouter: Router = Router({ mergeParams: true });

authRouter.post('/', async (req, res, next) => {
	console.log('[POST]authRouter body:', req.body);
	const authService = new AuthService();

	authService.authenticate(req.body)
		.then((data) => res.json(
			{
				data,
				success: true,
				message: 'Signed',
			}
		))
		.catch(err => next(err));
});
