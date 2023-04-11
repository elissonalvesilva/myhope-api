import { Router } from 'express';
import { adaptRoute } from '@/main/adapter/express-router-adapter';
import { auth } from '@/main/middlewares/auth';
import {
  makeCreateUserController,
  makeForgotPasswordController,
  makeGetResetCode,
  makeGetUserByEmail,
  makeGetUserById,
  makeSubmitQuiz,
  makeUpdatePasswordController,
} from '@/main/factories/presenters/controllers/user';

export default (router: Router): void => {
  router.get('/user/:id', auth, adaptRoute(makeGetUserById()));
  router.post('/reset_code', adaptRoute(makeGetResetCode()));
  router.post('/user_by_email', adaptRoute(makeGetUserByEmail()));
  router.post('/user', adaptRoute(makeCreateUserController()));
  router.put('/user/update_password', adaptRoute(makeUpdatePasswordController()));
  router.post('/user/quiz', auth, adaptRoute(makeSubmitQuiz()))
  router.post('/user/forgot_password', adaptRoute(makeForgotPasswordController()))
}
