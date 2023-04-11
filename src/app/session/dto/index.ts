
export interface SessionResponseDTO {
  id: string;
  token: string;
  expireDate: Date;
  userId: string;
}

export default interface SessionDTO {
  token: string;
  expireDate: Date;
  userId: string;
}