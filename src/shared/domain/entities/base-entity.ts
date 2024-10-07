import { v4 as uuidv4 } from 'uuid';

export interface BaseEntityProps {
  isActive?: boolean;
  createdAt?: Date;
  updatedAt?: Date | null;
  createdBy: string;
  updatedBy?: string | null;
}

export abstract class BaseEntity<Props extends BaseEntityProps> {
  protected readonly props: Props;
  private readonly _id: string;

  protected constructor(props: Props, id?: string) {
    this.props = {
      ...props,
      isActive: props.isActive ?? true,
      createdAt: props.createdAt ?? new Date(),
    };
    this._id = id ?? uuidv4();
  }

  public get id(): string {
    return this._id;
  }

  public get isActive(): boolean {
    return this.props.isActive!;
  }

  public set isActive(isActive: boolean) {
    this.props.isActive = isActive;
  }

  public get createdAt(): Date {
    return this.props.createdAt!;
  }

  public get updatedAt(): Date | null | undefined {
    return this.props.updatedAt;
  }

  public set updatedAt(updatedAt: Date) {
    this.props.updatedAt = updatedAt;
  }

  public get createdBy(): string {
    return this.props.createdBy;
  }

  public get updatedBy(): string | null | undefined {
    return this.props.updatedBy;
  }

  public set updatedBy(updatedBy: string) {
    this.props.updatedBy = updatedBy;
  }
}
