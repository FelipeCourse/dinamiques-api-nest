import { createParamDecorator, ExecutionContext } from '@nestjs/common';

import { UserEntity } from '@/features/auth/domain/entities/user.entity';

export const CurrentUser = createParamDecorator(
  (_: unknown, httpContext: ExecutionContext): UserEntity => {
    const request = httpContext.switchToHttp().getRequest();

    return request.user as UserEntity;
  },
);
