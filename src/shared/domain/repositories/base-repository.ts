import { QueryType } from '@/shared/types';

export abstract class BaseRepository<T> {
  abstract create(entity: T, uniqueField?: keyof T): Promise<void>;
  abstract getAll(query: QueryType): Promise<T[]>;
  abstract getById(entityId: string): Promise<T | null>;
  abstract update(
    entityId: string,
    updateEntity: T,
    uniqueField?: keyof T,
  ): Promise<void>;
  abstract delete(
    entityId: string,
    relationalConflictMessage?: string,
  ): Promise<void>;
  abstract softDelete(entityId: string): Promise<void>;
}
