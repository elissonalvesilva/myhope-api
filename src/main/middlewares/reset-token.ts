import { adaptMiddleware } from "@/main/adapter/express-middleware-adapter";
import { makeResetTokenMiddleware } from "@/main/factories/presenters/middlewares";

export const resetMiddleware = adaptMiddleware(makeResetTokenMiddleware());
