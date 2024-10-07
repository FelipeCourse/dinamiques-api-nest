import { ImageUrlValueObject } from './image-url.value-object';

describe('ImageUrlValueObject unit tests', () => {
  it('should be able create an instance with a valid imageUrl and get the value', () => {
    const imageUrl = ImageUrlValueObject.create(
      'https://www.pexels.com/pt-br/foto/preto-e-branco-p-b-cidade-meio-urbano-21533286/',
    );

    expect(imageUrl?.value).toBe(
      'https://www.pexels.com/pt-br/foto/preto-e-branco-p-b-cidade-meio-urbano-21533286/',
    );
  });

  it('should not be able to create a image url invalid', () => {
    expect(() => ImageUrlValueObject.create('invalid-image-url')).toThrow();
  });
});
