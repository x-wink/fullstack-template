export const limitPrecision = (value: number | string, precision = 2) => +Number(value).toFixed(precision);
