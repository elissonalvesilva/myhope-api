
export interface SessionResponseDTO {
  id: string;
  token: string;
  expiredDate: number;
}

export default interface SessionDTO {
  token: string;
  expiredDate: Date;
}