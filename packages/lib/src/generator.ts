export const useIdGenerator = (minValue = 0, minLength = 0) => {
    let id = minValue;
    return {
        auto() {
            return (++id + '').padStart(minLength, '0');
        },
    };
};
