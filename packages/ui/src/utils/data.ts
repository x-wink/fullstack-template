export const limitPrecision = (val: number, precision = 2) => {
    const p = 10 ** precision;
    return Math.round(val * p) / p;
};
