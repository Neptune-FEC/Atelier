import { getRecommendedPercentage } from './RatingsBreakdown';

test('test getRecommendedPercentage should return 50 given a recommendation object with 2 true and 2 false', () => {
  const recommendations = { true: 2, false: 2 };
  expect(getRecommendedPercentage(recommendations)).toBe(50);
});

test('test getRecommendedPercentage should return 0 given an invalid object', () => {
  const recommendations = {};
  expect(getRecommendedPercentage(recommendations)).toBe(0);
});
