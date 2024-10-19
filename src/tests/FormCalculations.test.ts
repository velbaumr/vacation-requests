import { calculateRequestedDays, calculateStartDate, calculateEndDate } from "../functions/FormCalculations";


describe('calculateRequestedDays', () => {
  test('should return 0 if either startDate or endDate is missing', () => {
    expect(calculateRequestedDays(undefined, new Date())).toBe(0);
    expect(calculateRequestedDays(new Date(), undefined)).toBe(0);
    expect(calculateRequestedDays(undefined, undefined)).toBe(0);
  });

  test('should return the correct number of requested days', () => {
    const startDate = new Date('2024-10-01');
    const endDate = new Date('2024-10-10');
    expect(calculateRequestedDays(startDate, endDate)).toBe(10);
  });

  test('should return 0 if the endDate is before the startDate', () => {
    const startDate = new Date('2024-10-10');
    const endDate = new Date('2024-10-01');
    expect(calculateRequestedDays(startDate, endDate)).toBe(0);
  });
});

describe('calculateStartDate', () => {
  test('should calculate the correct startDate from endDate and days', () => {
    const endDate = new Date('2024-10-10');
    const days = 10;
    const expectedStartDate = new Date('2024-10-01');
    expect(calculateStartDate(endDate, days)).toEqual(expectedStartDate);
  });

  test('should return the same date if days is 1', () => {
    const endDate = new Date('2024-10-10');
    const days = 1;
    expect(calculateStartDate(endDate, days)).toEqual(endDate);
  });
});

describe('calculateEndDate', () => {
  test('should calculate the correct endDate from startDate and days', () => {
    const startDate = new Date('2024-10-01');
    const days = 10;
    const expectedEndDate = new Date('2024-10-10');
    expect(calculateEndDate(startDate, days)).toEqual(expectedEndDate);
  });

  test('should return the same date if days is 1', () => {
    const startDate = new Date('2024-10-01');
    const days = 1;
    expect(calculateEndDate(startDate, days)).toEqual(startDate);
  });
});