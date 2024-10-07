import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class EnvironmentsService {
  constructor(private readonly configService: ConfigService) {}

  public getAppPort(): number {
    return Number(this.configService.get<number>('APP_PORT') || 3000);
  }

  public getJwtSecret(): string {
    return String(this.configService.get<string>('JWT_SECRET'));
  }

  public getJwtExpiresInSeconds(): number {
    return Number(this.configService.get<number>('JWT_EXPIRES_IN'));
  }

  public getDatabaseInMemory(): boolean {
    const isDatabaseInMemory =
      this.configService.get<string>('DATABASE_IN_MEMORY');

    return isDatabaseInMemory === 'true';
  }
}
