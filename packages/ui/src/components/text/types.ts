export const themeColors = ['default', 'primary', 'second', 'info', 'success', 'warn', 'error'] as const;
export type ThemeColor = typeof themeColors[number];
export type HTMLElementTagName = keyof HTMLElementTagNameMap;
