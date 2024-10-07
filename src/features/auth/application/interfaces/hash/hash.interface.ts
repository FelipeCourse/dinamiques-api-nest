export interface HashInterface {
  generateHash(payload: string): Promise<string>;
  compareHash(payload: string, currentHash: string): Promise<boolean>;
}
