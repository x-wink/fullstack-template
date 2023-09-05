export const inputTypes = ['text', 'password', 'number'] as const;
export type InputType = typeof inputTypes[number];
