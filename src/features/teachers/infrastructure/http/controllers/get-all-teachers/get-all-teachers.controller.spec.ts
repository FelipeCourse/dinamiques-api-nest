import { Test, TestingModule } from '@nestjs/testing';

import { PaginationDto } from '@/shared/application/dtos';
import { EnvironmentsModule } from '@/shared/infrastructure/environments/environments.module';
import { EnvironmentsService } from '@/shared/infrastructure/environments/services/environments.service';

import { UsersRepository } from '@/features/auth/domain/repositories/users.repository';
import { UsersInMemoryRepository } from '@/features/auth/infrastructure/database/in-memory/repositories/users-in-memory.repository';
import { AuthService } from '@/features/auth/infrastructure/http/services';
import { GetAllTeachersUseCase } from '@/features/teachers/application/usecases';
import { TeacherEntity } from '@/features/teachers/domain/entities/teacher.entity';
import { NameValueObject } from '@/features/teachers/domain/value-objects';

import { TeacherHttpMapper } from '../../mappers/teacher-http.mapper';
import { GetAllTeachersController } from './get-all-teachers.controller';

describe('GetAllTeachersController unit tests', () => {
  let getAllTeachersController: GetAllTeachersController;
  let getAllTeachersUseCase: GetAllTeachersUseCase;
  let teachersHttpMapper: typeof TeacherHttpMapper;

  const mockAuthService = {};

  const mockEnvironmentsService = {
    getDatabaseInMemory: jest.fn().mockReturnValue(true),
    getJwtSecret: jest.fn(),
    getJwtExpiresInSeconds: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [EnvironmentsModule],
      controllers: [GetAllTeachersController],
      providers: [
        {
          provide: GetAllTeachersUseCase,
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

    getAllTeachersController = module.get<GetAllTeachersController>(
      GetAllTeachersController,
    );
    getAllTeachersUseCase = module.get<GetAllTeachersUseCase>(
      GetAllTeachersUseCase,
    );
    teachersHttpMapper =
      module.get<typeof TeacherHttpMapper>(TeacherHttpMapper);
  });

  it('should be able to define GetAllTeachersController', () => {
    expect(getAllTeachersController).toBeDefined();
  });

  it('should be able to return mapped teachers with pagination', async () => {
    const paginationDto: PaginationDto = {
      page: 1,
      limit: 10,
    };

    const mockTeachers = [
      TeacherEntity.create({
        name: NameValueObject.create('Teacher 1'),
        createdBy: 'user-id-1',
      }),
      TeacherEntity.create({
        name: NameValueObject.create('Teacher 2'),
        createdBy: 'user-id-2',
      }),
    ];

    const mockMappedTeachers = mockTeachers.map((teacher) => ({
      id: teacher.id,
      name: teacher.name.value,
      userId: teacher.userId,
      isActive: teacher.isActive,
      createdAt: expect.any(Date),
      updatedAt: undefined,
      createdBy: teacher.createdBy,
      updatedBy: undefined,
    }));

    jest
      .spyOn(getAllTeachersUseCase, 'execute')
      .mockResolvedValue({ teachers: mockTeachers });
    jest.spyOn(teachersHttpMapper, 'toHttp').mockImplementation((teacher) => ({
      id: teacher.id,
      userId: teacher.userId,
      name: teacher.name.value,
      isActive: teacher.isActive,
      createdAt: teacher.createdAt ?? expect.any(Date),
      updatedAt: teacher.updatedAt ?? undefined,
      createdBy: teacher.createdBy,
      updatedBy: teacher.updatedBy ?? undefined,
    }));

    const result = await getAllTeachersController.handle(paginationDto);

    expect(result).toEqual(mockMappedTeachers);
    expect(getAllTeachersUseCase.execute).toHaveBeenCalledWith(paginationDto);
  });
});
