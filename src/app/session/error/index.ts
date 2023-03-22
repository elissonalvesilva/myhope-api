import { ErrorBase } from "@/domain/@/shared/error";

type ERR_CREATE_SESSION = "ERR_CREATE_SESSION";
type ERR_UPDATE_SESSION = "ERR_UPDATE_SESSION";
type ERR_NOT_FOUND_SESSION = "ERR_NOT_FOUND_SESSION";
type ERR_INVALID_SESSION = "ERR_INVALID_SESSION";

type ErrorName = 
  | ERR_CREATE_SESSION
  | ERR_UPDATE_SESSION
  | ERR_NOT_FOUND_SESSION
  | ERR_INVALID_SESSION;

export default class SessionError extends ErrorBase<ErrorName>{}