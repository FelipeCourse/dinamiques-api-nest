import { ReadingTimeValueObject } from './reading-time.value-object';

describe('ReadingTimeValueObject unit tests', () => {
  it('should be able create an instance with a valid reading time and get the value', () => {
    const readingTime = ReadingTimeValueObject.create(1);

    expect(readingTime.value).toBe(1);
  });

  it('should not be able to create a article reading time less than 0', () => {
    expect(() => ReadingTimeValueObject.create(-1)).toThrow();
  });
});
