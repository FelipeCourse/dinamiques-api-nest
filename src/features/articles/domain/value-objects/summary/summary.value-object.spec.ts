import { SummaryValueObject } from './summary.value-object';

describe('SummaryValueObject unit tests', () => {
  it('should be able create an instance with a valid summary and get the value', () => {
    const summary = SummaryValueObject.create('Teorema de Pitágoras');

    expect(summary.value).toBe('Teorema de Pitágoras');
  });

  it('should not be able to create a article summary with less than 10 characters', () => {
    expect(() => SummaryValueObject.create('A'.repeat(9))).toThrow();
  });

  it('should not be able to create a article summary with more than 200 characters', () => {
    expect(() => SummaryValueObject.create('A'.repeat(201))).toThrow();
  });
});
