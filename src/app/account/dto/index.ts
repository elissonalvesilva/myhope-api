import Statement from "@/domain/account/entity/statement";

export default interface AccountDTO {
  accountNumber: string;
  balance: number;
  statements?: Statement[];
}