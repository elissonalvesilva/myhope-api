import { adaptMiddleware } from "@/main/adapter/express-middleware-adapter";
import { makeAuthMiddleware } from "@/main/factories/presenters/middlewares";

export const auth = adaptMiddleware(makeAuthMiddleware());
