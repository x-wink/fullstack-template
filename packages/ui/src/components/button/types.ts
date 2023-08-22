export const buttonThemes = ['default', 'primary', 'second', 'info', 'success', 'warn', 'error'] as const;
export type ButtonTheme = typeof buttonThemes[number];
