const DEMO_MIN = 3.2;
const DEMO_MAX = 5;

const hashString = (value) => {
  let hash = 2166136261;

  for (let index = 0; index < value.length; index += 1) {
    hash ^= value.charCodeAt(index);
    hash = Math.imul(hash, 16777619);
  }

  return hash >>> 0;
};

export const getDemoRating = (date, metric) => {
  const seed = `${date}|${metric}`;
  const normalized = hashString(seed) / 4294967295;
  const rating = DEMO_MIN + normalized * (DEMO_MAX - DEMO_MIN);

  return Number(rating.toFixed(2));
};