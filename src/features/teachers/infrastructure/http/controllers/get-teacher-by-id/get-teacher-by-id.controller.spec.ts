import { Test, TestingModule } from '@nestjs/testing';

import { EnvironmentsModule } from '@/shared/infrastructure/environments/environments.module';
import { EnvironmentsService } from '@/shared/infrastructure/environments/services/environments.service';

import { UsersRepository } from '@/features/auth/domain/repositories/users.repository';
import { UsersInMemoryRepository } from '@/features/auth/infrastructure/database/in-memory/repositories/users-in-memory.repository';
import { AuthService } from '@/features/auth/infrastructure/http/services';
import { GetTeacherByIdUseCase } from '@/features/teachers/application/usecases';
import { TeacherEntity } from '@/features/teachers/domain/entities/teacher.entity';
import { NameValueObject } from '@/features/teachers/domain/value-objects';

import { TeacherHttpMapper } from '../../mappers/teacher-http.mapper';
import { GetTeacherByIdController } from './get-teacher-by-id.controller';

describe('GetTeacherByIdController unit tests', () => {
  let getTeacherByIdController: GetTeacherByIdController;
  let getTeacherByIdUseCase: GetTeacherByIdUseCase;

  const mockAuthService = {};

  const mockEnvironmentsService = {
    getDatabaseInMemory: jest.fn().mockReturnValue(true),
    getJwtSecret: jest.fn(),
    getJwtExpiresInSeconds: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [EnvironmentsModule],
      controllers: [GetTeacherByIdController],
      providers: [
        {
          provide: GetTeacherByIdUseCase,
          useValue: { execute: jest.fn() },
        },
        {
          provide: TeacherHttpMapper,
          useValue: {
            toHttp: jest.fn(),
          },
        },
        {
          provide: EnvironmentsService,
          useValue: mockEnvironmentsService,
        },
        {
          provide: AuthService,
          useValue: mockAuthService,
        },
        {
          provide: UsersRepository,
          useClass: UsersInMemoryRepository,
        },
      ],
    }).compile();

    getTeacherByIdController = module.get<GetTeacherByIdController>(
      GetTeacherByIdController,
    );
    getTeacherByIdUseCase = module.get<GetTeacherByIdUseCase>(
      GetTeacherByIdUseCase,
    );
  });

  it('should be able to define GetTeacherByIdUseCase', () => {
    expect(getTeacherByIdController).toBeDefined();
  });

  it('should be able to call getTeacherByIdUseCase and return the mapped teacher', async () => {
    const mockTeacherEntity = TeacherEntity.create({
      userId: null,
      name: NameValueObject.create('Test Teacher'),
      createdBy: '415ae5c0-dc65-4602-a8e1-e485eda20521',
    });
    const mockMappedTeacher = {
      id: mockTeacherEntity.id,
      userId: null,
      name: 'Test Teacher',
      isActive: true,
      createdAt: expect.any(Date),
      updatedAt: undefined,
      createdBy: mockTeacherEntity.createdBy,
      updatedBy: undefined,
    };
    const teacherId = mockTeacherEntity.id;

    jest
      .spyOn(getTeacherByIdUseCase, 'execute')
      .mockResolvedValue({ teacher: mockTeacherEntity });

    const result = await getTeacherByIdController.handle(teacherId);

    expect(result).toEqual(mockMappedTeacher);
    expect(getTeacherByIdUseCase.execute).toHaveBeenCalledWith({
      teacherId,
    });
  });
});
