import { ErrorBase } from "@/domain/@/shared/error";

type ERR_ACCOUNT_NOT_FOUND = "ERR_ACCOUNT_NOT_FOUND";
type ERR_CANT_UPDATE_BALANCE = "ERR_CANT_UPDATE_BALANCE";
type ERR_TO_ADD_STATEMENT = "ERR_TO_ADD_STATEMENT";

type ErrorType =
  | ERR_ACCOUNT_NOT_FOUND
  | ERR_CANT_UPDATE_BALANCE
  | ERR_TO_ADD_STATEMENT;
  

export default class AccountError extends ErrorBase<ErrorType> {} 