import { ColorValueObject, NameValueObject } from '../value-objects';
import { CategoryEntity } from './category.entity';

describe('CategoryEntity unit tests', () => {
  let category: CategoryEntity;

  beforeEach(() => {
    category = CategoryEntity.create({
      name: NameValueObject.create('John Doe'),
      color: ColorValueObject.create('#fff000'),
      createdBy: '629ec5c1-dc65-4602-f8e1-e485eda80529',
    });
  });

  it('should be able to create a category', () => {
    expect(category).toBeTruthy();
  });

  it('should be able to get the name field', () => {
    expect(category.name).toBeDefined();
    expect(typeof category.name.value).toBe('string');
    expect(category.name.value).toEqual('John Doe');
  });

  it('should be able to set the name field', () => {
    const newName = NameValueObject.create('Other Name');

    category.name = newName;

    expect(category.name.value).toEqual(newName.value);
  });

  it('should be able to get the color field', () => {
    expect(category.color).toBeDefined();
    expect(typeof category.color.value).toBe('string');
    expect(category.color.value).toEqual('#fff000');
  });

  it('should be able to set the color field', () => {
    const newColor = ColorValueObject.create('#ff2211');

    category.color = newColor;

    expect(category.color.value).toEqual(newColor.value);
  });

  it('should be able to get the isActive field', () => {
    expect(category.isActive).toBeDefined();
    expect(typeof category.isActive).toBe('boolean');
    expect(category.isActive).toEqual(true);
  });

  it('should be able to set the isActive field', () => {
    const newIsActive = false;

    category.isActive = newIsActive;

    expect(category.isActive).toEqual(newIsActive);
  });
});
