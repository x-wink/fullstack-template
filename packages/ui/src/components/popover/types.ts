export const popoverTriggers = ['click', 'hover'] as const;
export type PopoverTrigger = typeof popoverTriggers[number];
