import { Test, TestingModule } from '@nestjs/testing';

import { GenderEnum } from '@/shared/enums';

import { MessageService } from './message.service';

describe('MessageService unit tests', () => {
  let messageService: MessageService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MessageService],
    }).compile();

    messageService = module.get<MessageService>(MessageService);
  });

  it('should be able to define MessageService', () => {
    expect(messageService).toBeDefined();
  });

  it('should be able to return success message for created resource (male)', () => {
    const result = messageService.handleMessage({
      messageType: 'success',
      resource: 'Usuário',
      action: 'created',
      gender: GenderEnum.MALE,
    });
    expect(result).toEqual({ message: 'Usuário criado com sucesso.' });
  });

  it('should be able to return success message for created resource (female)', () => {
    const result = messageService.handleMessage({
      messageType: 'success',
      resource: 'Categoria',
      action: 'created',
      gender: GenderEnum.FEMALE,
    });
    expect(result).toEqual({ message: 'Categoria criada com sucesso.' });
  });

  it('should be able to return error message for notFound (male)', () => {
    const result = messageService.handleMessage({
      messageType: 'error',
      resource: 'Usuário',
      action: 'notFound',
      gender: GenderEnum.MALE,
    });
    expect(result).toEqual({ message: 'Usuário não encontrado.' });
  });

  it('should be able to return error message for notFound (female)', () => {
    const result = messageService.handleMessage({
      messageType: 'error',
      resource: 'Categoria',
      action: 'notFound',
      gender: GenderEnum.FEMALE,
    });
    expect(result).toEqual({ message: 'Categoria não encontrada.' });
  });

  it('should be able to return success message for updated resource (male)', () => {
    const result = messageService.handleMessage({
      messageType: 'success',
      resource: 'Usuário',
      action: 'updated',
      gender: GenderEnum.MALE,
    });
    expect(result).toEqual({ message: 'Usuário editado com sucesso.' });
  });

  it('should be able to return error message for invalidCredentials (male)', () => {
    const result = messageService.handleMessage({
      messageType: 'error',
      resource: 'Usuário',
      action: 'invalidCredentials',
      gender: GenderEnum.FEMALE,
    });
    expect(result).toEqual({ message: 'Usuário com credenciais inválidas.' });
  });
});
