import { imageUrl } from './ImageUrl';

describe('imageUrl function:', () => {
  test('should return string', () => {
    expect(typeof imageUrl()).toBe('string');
  });
});
