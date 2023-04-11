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
import { resetMiddleware } from '@/main/middlewares/reset-token';

export default (router: Router): void => {
  router.get('/user/:id', auth, adaptRoute(makeGetUserById()));
  router.post('/user_by_email', adaptRoute(makeGetUserByEmail()));
  router.post('/user', adaptRoute(makeCreateUserController()));
  router.post('/user/quiz', auth, adaptRoute(makeSubmitQuiz()))
  
  router.post('/user/reset_code', resetMiddleware, adaptRoute(makeGetResetCode()));
  router.put('/user/update_password', resetMiddleware, adaptRoute(makeUpdatePasswordController()));
  router.post('/user/forgot_password', adaptRoute(makeForgotPasswordController()))
}
