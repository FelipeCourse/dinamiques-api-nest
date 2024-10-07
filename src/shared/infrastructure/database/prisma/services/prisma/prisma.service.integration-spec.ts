// eslint-disable-next-line import/no-extraneous-dependencies
import { Test, TestingModule } from '@nestjs/testing';

import { PrismaService } from './prisma.service';

describe('PrismaService integration tests', () => {
  let prismaService: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PrismaService],
    }).compile();

    prismaService = module.get<PrismaService>(PrismaService);
  });

  it('should be able to define PrismaService', () => {
    expect(prismaService).toBeDefined();
  });

  it('should be able to disconnect from the database', async () => {
    const disconnectSpy = jest
      .spyOn(prismaService, '$disconnect')
      .mockResolvedValue(undefined);

    await prismaService.onModuleDestroy();

    expect(disconnectSpy).toHaveBeenCalled();
  });
});
