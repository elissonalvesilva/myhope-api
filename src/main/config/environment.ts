const env = {
  SECRET_KEY: process.env.SECRET_KEY || "secret",
  INIT_VECTOR: process.env.INIT_VECTOR || "init-vector",
  EXPIRE_TOKEN_IN_MINUTES: parseInt(process.env.EXPIRE_TOKEN_IN_MINUTES || '30'),
}

export default env;