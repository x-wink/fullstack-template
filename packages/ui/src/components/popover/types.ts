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

// eslint-disable-next-line @typescript-eslint/no-unused-vars
type ExtractPlacement<T extends string> = T extends `${infer Y}-${infer U}` ? [Y, U] : never;
export type PopoverArrowDirection = ExtractPlacement<typeof popoverPlacements[number]>[0];
type PopoverArrowDefinedPlacement = ExtractPlacement<typeof popoverPlacements[number]>[1] | 'center';
export type PopoverArrowPlacement = PopoverArrowDefinedPlacement | 'center';
export type PopoverPlacement = PopoverArrowDirection | `${PopoverArrowDirection}-${PopoverArrowDefinedPlacement}`;
export const popoverArrowPlacements = Array.from(
    new Set(popoverPlacements.map((item) => item.split('-')[1] ?? 'center'))
) as PopoverArrowPlacement[];
