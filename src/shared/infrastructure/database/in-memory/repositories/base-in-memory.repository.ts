import { BaseEntity } from '@/shared/domain/entities/base-entity';
import { BaseRepository } from '@/shared/domain/repositories/base-repository';
import { QueryType } from '@/shared/types';

export abstract class BaseInMemoryRepository<T extends BaseEntity<any>>
  implements BaseRepository<T>
{
  public entities: T[] = [];

  public async create(entity: T): Promise<void> {
    this.entities.push(entity);
  }

  private getEntityValue(entity: T, key: string): string | undefined {
    const valueObject = entity[key]?.value;

    if (valueObject) {
      return valueObject.toString().toLowerCase();
    }

    return entity[key]?.toString().toLowerCase();
  }

  private matchesFilter(entity: T, filter: Record<string, any>): boolean {
    return Object.entries(filter).some(([key, value]) => {
      const entityValue = this.getEntityValue(entity, key);
      const filterValue = value.toString().toLowerCase();

      return entityValue?.includes(filterValue);
    });
  }

  private handleFilter(filter?: Record<string, any>): T[] {
    if (!filter || Object.keys(filter).length === 0) {
      return this.entities;
    }

    return this.entities.filter((entity) => this.matchesFilter(entity, filter));
  }

  private handlePagination(page: number, limit: number, resource: T[]): T[] {
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;

    return resource.slice(startIndex, endIndex);
  }

  public async getAll({
    filter,
    page = 1,
    limit = 10,
  }: QueryType): Promise<T[]> {
    const filteredResource = this.handleFilter(filter);
    const filteredAndPaginatedResource = this.handlePagination(
      page,
      limit,
      filteredResource,
    );

    return filteredAndPaginatedResource;
  }

  public async getById(entityId: string): Promise<T | null> {
    const resource = this.entities.find((entity) => entity.id === entityId);

    if (!resource) {
      return null;
    }

    return resource;
  }

  public async update(entityId: string, updateEntity: T): Promise<void> {
    const resourceIndex = this.entities.findIndex(
      (entity) => entity.id === entityId,
    );

    this.entities[resourceIndex] = updateEntity;
  }

  public async delete(entityId: string): Promise<void> {
    const resource = this.entities.filter((entity) => entity.id !== entityId);

    this.entities = resource;
  }

  public async softDelete(entityId: string): Promise<void> {
    const resourceIndex = this.entities.findIndex(
      (entity) => entity.id === entityId,
    );

    if (resourceIndex !== -1) {
      this.entities[resourceIndex].isActive = false;
    }
  }
}
