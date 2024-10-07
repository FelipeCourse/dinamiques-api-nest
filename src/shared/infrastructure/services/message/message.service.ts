import { Injectable } from '@nestjs/common';

import { GenderEnum } from '@/shared/enums';

type HandleMessageParams = {
  messageType: 'success' | 'error';
  resource: string;
  action:
    | 'created'
    | 'updated'
    | 'deleted'
    | 'signin'
    | 'notFound'
    | 'invalidCredentials'
    | 'existingConflict'
    | 'relationalConflict'
    | 'alreadyDeactivatedConflict';
  gender: GenderEnum;
};

type HandleMessageResponse = {
  message: string;
};

@Injectable()
export class MessageService {
  private successMessageSufix = 'com sucesso.';
  private readonly successBaseMessages = {
    created: {
      [GenderEnum.MALE]: `criado ${this.successMessageSufix}`,
      [GenderEnum.FEMALE]: `criada ${this.successMessageSufix}`,
    },
    updated: {
      [GenderEnum.MALE]: `editado ${this.successMessageSufix}`,
      [GenderEnum.FEMALE]: `editada ${this.successMessageSufix}`,
    },
    deleted: {
      [GenderEnum.MALE]: `removido ${this.successMessageSufix}`,
      [GenderEnum.FEMALE]: `removida ${this.successMessageSufix}`,
    },
    signin: {
      [GenderEnum.MALE]: `autenticado ${this.successMessageSufix}`,
    },
  };
  private readonly errorBaseMessages = {
    notFound: {
      [GenderEnum.MALE]: 'não encontrado.',
      [GenderEnum.FEMALE]: 'não encontrada.',
    },
    invalidCredentials: {
      [GenderEnum.MALE]: 'com credenciais inválidas.',
      [GenderEnum.FEMALE]: 'com credenciais inválidas.',
    },
    existingConflict: {
      [GenderEnum.MALE]: 'já existente.',
      [GenderEnum.FEMALE]: 'já existente.',
    },
    relationalConflict: {
      [GenderEnum.MALE]: 'associado em um outro recurso.',
      [GenderEnum.FEMALE]: 'associada em um outro recurso.',
    },
    alreadyDeactivatedConflict: {
      [GenderEnum.MALE]: 'já está desativado.',
      [GenderEnum.FEMALE]: 'já está desativada.',
    },
  };

  public handleMessage(options: HandleMessageParams): HandleMessageResponse {
    const { messageType, resource, action, gender } = options;
    const baseMessage =
      messageType === 'success'
        ? this.successBaseMessages
        : this.errorBaseMessages;

    return {
      message: `${resource} ${baseMessage[action][gender]}`,
    };
  }
}
