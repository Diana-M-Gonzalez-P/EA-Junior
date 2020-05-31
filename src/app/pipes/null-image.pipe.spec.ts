import { NullImagePipe } from './null-image.pipe';

describe('NullImagePipe', () => {
  it('create an instance', () => {
    const pipe = new NullImagePipe();
    expect(pipe).toBeTruthy();
  });
});
