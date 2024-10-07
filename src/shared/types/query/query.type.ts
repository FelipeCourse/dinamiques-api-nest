import { PaginationType } from '../pagination/pagination.type';

export type QueryType = {
  filter?: Record<string, any>;
} & PaginationType;
