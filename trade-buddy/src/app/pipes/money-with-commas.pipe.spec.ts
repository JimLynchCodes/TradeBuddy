import { MoneyWithCommasPipe } from './money-with-commas.pipe';

describe('MoneyWithCommasPipe', () => {
  it('create an instance', () => {
    const pipe = new MoneyWithCommasPipe();
    expect(pipe).toBeTruthy();
  });
});
