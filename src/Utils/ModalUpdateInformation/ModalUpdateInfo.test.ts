import { updateInformation } from './ModalUpdateBookInformation';

describe('modal update information function:', () => {
  test('should return object', () => {
    expect(typeof updateInformation()).toBe('object');
  });
});
