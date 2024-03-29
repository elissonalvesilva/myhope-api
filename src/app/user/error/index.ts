import { ErrorBase } from "@/domain/@/shared/error";

type ERR_USER_NOT_FOUND = "ERR_USER_NOT_FOUND"
type ERR_USER_NOT_CREATED = "ERR_USER_NOT_CREATED"
type ERR_RESET_CODE_USER_NOT_FOUND = "ERR_RESET_CODE_USER_NOT_FOUND"
type ERR_CREATE_ACCOUNT = "ERR_CREATE_ACCOUNT"
type ERR_USER_ALREADY_EXISTS = "ERR_USER_ALREADY_EXISTS";
type ERR_TO_UPDATE_PASSWORD = "ERR_TO_UPDATE_PASSWORD";
type ERR_SUBMITED_QUIZ_NOT_FOUND = "ERR_SUBMITED_QUIZ_NOT_FOUND";
type ERR_SUBMITED_QUIZ = "ERR_SUBMITED_QUIZ";
type ERR_TO_SET_RESET_CODE = "ERR_TO_SET_RESET_CODE";
type ERR_TO_SEND_EMAIL_WITH_RESET_CODE = "ERR_TO_SEND_EMAIL_WITH_RESET_CODE";
type ERR_INVALID_RESET_CODE = "ERR_INVALID_RESET_CODE";
type ERR_GENERATE_TOKEN = "ERR_GENERATE_TOKEN";
type ERR_INVALID_RESET_TOKEN = "ERR_INVALID_RESET_TOKEN";
type ERR_UPDATE_USER = "ERR_UPDATE_USER";
type ERR_TO_GET_RANKING = "ERR_TO_GET_RANKING";

type ErrorType = 
  | ERR_USER_NOT_FOUND
  | ERR_USER_NOT_CREATED
  | ERR_RESET_CODE_USER_NOT_FOUND
  | ERR_CREATE_ACCOUNT
  | ERR_USER_ALREADY_EXISTS
  | ERR_TO_UPDATE_PASSWORD
  | ERR_SUBMITED_QUIZ_NOT_FOUND
  | ERR_SUBMITED_QUIZ
  | ERR_TO_SET_RESET_CODE
  | ERR_TO_SEND_EMAIL_WITH_RESET_CODE
  | ERR_INVALID_RESET_CODE
  | ERR_GENERATE_TOKEN
  | ERR_INVALID_RESET_TOKEN
  | ERR_UPDATE_USER
  | ERR_TO_GET_RANKING;
  

export default class UserError extends ErrorBase<ErrorType> {} 