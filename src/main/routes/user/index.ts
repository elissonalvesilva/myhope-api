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
  makeUpdateUserController,
} from '@/main/factories/presenters/controllers/user';
import { resetMiddleware } from '@/main/middlewares/reset-token';
import { schemaValidator } from '@/main/middlewares';



export default (router: Router): void => {
  router.get('/user/:id', auth, adaptRoute(makeGetUserById()));
  router.post('/user_by_email', auth, adaptRoute(makeGetUserByEmail()));
  router.post('/user', schemaValidator('user', 'create'), adaptRoute(makeCreateUserController()));
  router.post('/user/quiz', auth, adaptRoute(makeSubmitQuiz()))
  router.put('/user', schemaValidator('user', 'update'), adaptRoute(makeUpdateUserController()));
  
  router.post('/user/reset_code', [schemaValidator('user', 'reset_code'), resetMiddleware], adaptRoute(makeGetResetCode()));
  router.put('/user/update_password', [schemaValidator('user', 'update_pass'), resetMiddleware], adaptRoute(makeUpdatePasswordController()));
  router.post('/user/forgot_password', schemaValidator('user', 'forgot_pass'), adaptRoute(makeForgotPasswordController()))
}
