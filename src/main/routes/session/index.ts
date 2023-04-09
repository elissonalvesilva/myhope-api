import { Router } from 'express';
import { adaptRoute } from '@/main/adapter/express-router-adapter';
import { makeLoginController, makeLogoutController } from '@/main/factories/presenters/controllers/session';

export default (router: Router): void => {
  router.post('/login',  adaptRoute(makeLoginController()));
  router.post('/logout',  adaptRoute(makeLogoutController()));
}
