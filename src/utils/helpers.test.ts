import { formatToISOString } from "./helpers"; 
describe('formatToISOString', () => {
  it('formats date to ISO string correctly', () => {

    const testDate = new Date('2023-11-30T12:34:56.789Z');

    const result = formatToISOString(testDate);

    expect(result).toBe('2023-11-30');
  });
});
