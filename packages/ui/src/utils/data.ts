export const limitPrecision = (val: number, precision = 2) => {
    const p = 10 ** precision;
    return ~~(val * p) / p;
};
