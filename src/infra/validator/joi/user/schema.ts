import Joi from 'joi';

export const UserSchemaCreate = Joi.object({
  name: Joi.string().min(3).required(),
  lastName: Joi.string().required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(5).required(),
});

export const ForgotPassSchema = Joi.object({
  email: Joi.string().email().required(),
})

export const ResetCodeSchema = Joi.object({
  token: Joi.string().min(20).required(),
  email: Joi.string().email().required(),
  resetCode: Joi.number().required(),
});

export const UpdatePasswordSchema = Joi.object({
  token: Joi.string().min(20).required(),
  email: Joi.string().email().required(),
  resetCode: Joi.number().required(),
  password: Joi.string().min(5).required(),
});

export const UserSubmitQuiz = Joi.object({
  submitedQuiz: Joi.object({
    id: Joi.string().min(20).required(),
    selectedAnswers: Joi.array().items(
      Joi.object({
        idQuestion: Joi.string().min(20).required(),
        idSelectedAnswer: Joi.number(),
      })
    )
  })
})

export const UpdateUserSchema = Joi.object({
  name: Joi.string().min(3).optional(),
  email: Joi.string().email().optional(),
  lastName: Joi.string().min(3).optional(),
  image: Joi.string().min(30).optional(),
})