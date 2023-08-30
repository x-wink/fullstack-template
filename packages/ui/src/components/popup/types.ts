export const popupPlacements = [
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
export type PopupArrowDirection = ExtractPlacement<typeof popupPlacements[number]>[0];
type PopupArrowDefinedPlacement = ExtractPlacement<typeof popupPlacements[number]>[1] | 'center';
export type PopupArrowPlacement = PopupArrowDefinedPlacement | 'center';
export type PopupPlacement = PopupArrowDirection | `${PopupArrowDirection}-${PopupArrowDefinedPlacement}`;
export const popupArrowPlacements = Array.from(
    new Set(popupPlacements.map((item) => item.split('-')[1] ?? 'center'))
) as PopupArrowPlacement[];
