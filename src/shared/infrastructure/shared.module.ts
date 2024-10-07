import { Module } from '@nestjs/common';

import { PrismaService } from './database/prisma/services/prisma/prisma.service';
import { EnvironmentsModule } from './environments/environments.module';

@Module({
  imports: [EnvironmentsModule],
  providers: [PrismaService],
  exports: [PrismaService],
})
export class SharedModule {}
