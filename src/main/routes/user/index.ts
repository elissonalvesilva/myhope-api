import { Router } from 'express';
import { adaptRoute } from '@/main/adapter/express-router-adapter';
import { auth } from '@/main/middlewares/auth';
import {
  makeCreateUserController,
  makeGetResetCode,
  makeGetUserByEmail,
  makeGetUserById
} from '@/main/factories/presenters/controllers/user';

export default (router: Router): void => {
  router.get('/user/:id', auth, adaptRoute(makeGetUserById()));
  router.post('/reset_code', adaptRoute(makeGetResetCode()));
  router.post('/user_by_email', auth, adaptRoute(makeGetUserByEmail()));
  router.post('/user', adaptRoute(makeCreateUserController()));
}
