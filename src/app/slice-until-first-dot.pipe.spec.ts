import { SliceUntilFirstDotPipe } from './slice-until-first-dot.pipe';

describe('SliceUntilFirstDotPipe', () => {
  it('create an instance', () => {
    const pipe = new SliceUntilFirstDotPipe();
    expect(pipe).toBeTruthy();
  });
});
