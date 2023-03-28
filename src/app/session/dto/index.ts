
export interface SessionResponseDTO {
  id: string;
  token: string;
  expiredDate: number;
  userId: string;
}

export default interface SessionDTO {
  token: string;
  expiredDate: Date;
  userId: string;
}