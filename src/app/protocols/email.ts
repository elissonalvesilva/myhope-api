export default interface EmailService {
  sendResetEmail(email: string, code: number): Promise<boolean | null>;
  sendWelcome(email: string, name): Promise<boolean | null >
}