import { Router } from 'express';
import { adaptRoute } from '@/main/adapter/express-router-adapter';
import { auth } from '@/main/middlewares/auth';
import {
  makeCreateQuizController,
  makeDeleteQuizController,
  makeGetQuizByIdQuizController,
  makeListQuizzesByParamsController,
  makeListQuizzesController,
  makeUpdateQuizController
} from '@/main/factories/presenters/controllers/quiz';

export default (router: Router): void => {
  router.get('/quiz/:id', auth, adaptRoute(makeGetQuizByIdQuizController()));
  router.get('/quiz', auth, adaptRoute(makeListQuizzesController()));
  router.post('/quiz_by_params', auth, adaptRoute(makeListQuizzesByParamsController()));
  router.post('/quiz', auth, adaptRoute(makeCreateQuizController()));
  router.put('/quiz/:id', auth, adaptRoute(makeUpdateQuizController()));
  router.delete('/quiz/:id', auth, adaptRoute(makeDeleteQuizController()));
}