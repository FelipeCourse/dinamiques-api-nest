import { NameValueObject } from '../value-objects';
import { TeacherEntity } from './teacher.entity';

describe('TeacherEntity unit tests', () => {
  let teacher: TeacherEntity;

  beforeEach(() => {
    teacher = TeacherEntity.create({
      userId: '421ef4c0-dc65-4602-a8e1-e485eda80510',
      name: NameValueObject.create('John Doe'),
      createdBy: '629ec5c1-dc65-4602-f8e1-e485eda80529',
    });
  });

  it('should be able to create a teacher', () => {
    expect(teacher).toBeTruthy();
  });

  it('should be able to get the userId field', () => {
    expect(teacher.userId).toBeDefined();
    expect(typeof teacher.userId).toBe('string');
    expect(teacher.userId).toEqual('421ef4c0-dc65-4602-a8e1-e485eda80510');
  });

  it('should be able to set the userId field', () => {
    const newUserId = '421ef4c0-dc65-4602-a8e1-e485eda80510';
    teacher.userId = newUserId;

    expect(teacher.userId).toEqual(newUserId);
  });

  it('should be able to get the name field', () => {
    expect(teacher.name).toBeDefined();
    expect(typeof teacher.name.value).toBe('string');
    expect(teacher.name.value).toEqual('John Doe');
  });

  it('should be able to set the name field', () => {
    const newName = NameValueObject.create('Other Name');

    teacher.name = newName;

    expect(teacher.name.value).toEqual(newName.value);
  });
});
