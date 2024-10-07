import { Injectable } from '@nestjs/common';
import { compare, hash } from 'bcryptjs';

import { HashInterface } from '@/features/auth/application/interfaces';

@Injectable()
export class HashService implements HashInterface {
  public async generateHash(payload: string): Promise<string> {
    return hash(payload, 6);
  }

  public async compareHash(
    payload: string,
    currentHash: string,
  ): Promise<boolean> {
    return compare(payload, currentHash);
  }
}
