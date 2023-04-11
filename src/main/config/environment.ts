const env = {
  SECRET_KEY: process.env.SECRET_KEY || "secret",
  INIT_VECTOR: process.env.INIT_VECTOR || "init-vector",
  EXPIRE_TOKEN_IN_MINUTES: parseInt(process.env.EXPIRE_TOKEN_IN_MINUTES || '30'),
  MAIL_HOST: process.env.MAIL_HOST,
  MAIL_PORT: process.env.MAIL_PORT,
  MAIL_USER: process.env.MAIL_USER,
  MAIL_PASSWORD: process.env.MAIL_PASSWORD,
  MAIL_FROM: process.env.MAIL_FROM,
}

export default env;