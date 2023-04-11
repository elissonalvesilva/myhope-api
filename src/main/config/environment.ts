const env = {
  SECRET_KEY: process.env.SECRET_KEY || "secret",
  INIT_VECTOR: process.env.INIT_VECTOR || "init-vector",
  EXPIRE_TOKEN_IN_MINUTES: parseInt(process.env.EXPIRE_TOKEN_IN_MINUTES || '30'),
  MAIL_HOST: 'smtp.gmail.com',
  MAIL_PORT: 465,
  MAIL_USER: 'nossilesilva@gmail.com',
  MAIL_PASSWORD: 'ymfdtwfuxhzlyful',
  MAIL_FROM: 'nossilesilva@gmail.com',
}

export default env;