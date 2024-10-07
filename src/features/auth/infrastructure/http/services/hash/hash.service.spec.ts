import { Test, TestingModule } from '@nestjs/testing';
import { compare, hash } from 'bcryptjs';

import { HashService } from './hash.service';

jest.mock('bcryptjs');

describe('HashService unit tests', () => {
  let hashService: HashService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [HashService],
    }).compile();

    hashService = module.get<HashService>(HashService);
  });

  it('should be able to hash the payload correctly', async () => {
    const payload = 'myPassword';
    const hashedValue = 'hashedValue';

    (hash as jest.Mock).mockResolvedValue(hashedValue);

    const result = await hashService.generateHash(payload);

    expect(result).toBe(hashedValue);
    expect(hash).toHaveBeenCalledWith(payload, 6);
  });

  it('should be able to return true when hashes match', async () => {
    const payload = 'myPassword';
    const currentHash = 'hashedValue';

    (compare as jest.Mock).mockResolvedValue(true);

    const result = await hashService.compareHash(payload, currentHash);

    expect(result).toBe(true);
    expect(compare).toHaveBeenCalledWith(payload, currentHash);
  });

  it('should be able to return false when hashes do not match', async () => {
    const payload = 'myPassword';
    const currentHash = 'hashedValue';

    (compare as jest.Mock).mockResolvedValue(false);

    const result = await hashService.compareHash(payload, currentHash);

    expect(result).toBe(false);
    expect(compare).toHaveBeenCalledWith(payload, currentHash);
  });
});
