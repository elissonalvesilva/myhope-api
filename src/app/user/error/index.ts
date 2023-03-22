import { ErrorBase } from "@/domain/@/shared/error";

type ERR_USER_NOT_FOUND = "ERR_USER_NOT_FOUND"
type ERR_USER_NOT_CREATED = "ERR_USER_NOT_CREATED"
type ERR_RESET_CODE_USER_NOT_FOUND = "ERR_RESET_CODE_USER_NOT_FOUND"
type ERR_CREATE_ACCOUNT = "ERR_CREATE_ACCOUNT"

type ErrorType = 
  | ERR_USER_NOT_FOUND
  | ERR_USER_NOT_CREATED
  | ERR_RESET_CODE_USER_NOT_FOUND
  | ERR_CREATE_ACCOUNT
  

export default class UserError extends ErrorBase<ErrorType> {} 