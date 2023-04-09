import { Router } from 'express';
import { adaptRoute } from '@/main/adapter/express-router-adapter';
import { makeAccountController } from '@/main/factories/presenters/controllers/account';
import { auth } from '@/main/middlewares/auth';

export default (router: Router): void => {
  router.put('/update_balance', auth , adaptRoute(makeAccountController()));
}
