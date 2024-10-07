import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { EnvironmentsService } from '@/shared/infrastructure/environments/services/environments.service';

type GenerateJwtProps = {
  accessToken: string;
};

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly environmentsService: EnvironmentsService,
  ) {}

  public async generateJwt(userId: string): Promise<GenerateJwtProps> {
    const accessToken = await this.jwtService.signAsync({ id: userId }, {});

    return { accessToken };
  }

  public async verifyJwt(token: string) {
    return this.jwtService.verifyAsync(token, {
      secret: this.environmentsService.getJwtSecret(),
    });
  }
}
