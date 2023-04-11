export default interface EmailService {
  sendResetEmail(email: string, code: number): Promise<boolean | null>;
}