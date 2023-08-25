export const popoverArrowPlacements = ['center', 'top', 'right', 'bottom', 'left'] as const;
export type PopoverArrowPlacement = typeof popoverArrowPlacements[number];

export const popoverPlacements = [
    'top-left',
    'top',
    'top-right',
    'right-top',
    'right',
    'right-bottom',
    'bottom-left',
    'bottom',
    'bottom-right',
    'left-top',
    'left',
    'left-bottom',
] as const;
export type PopoverPlacement = typeof popoverPlacements[number];
