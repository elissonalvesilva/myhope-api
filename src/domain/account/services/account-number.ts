export default class AccountService {
  static accountNumber(): string {
    let digits = Math.floor(Math.random()* 999 + Date.now()).toString();
    digits = digits.substring(2, 12);
    const digit = Math.floor(Math.random() * 9);
    return `${digits}-${digit}`; 
  }
}