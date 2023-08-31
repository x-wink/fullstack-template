export const popoverTriggers = ['click', 'hover', 'manual'] as const;
export type PopoverTrigger = typeof popoverTriggers[number];
