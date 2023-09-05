export type ModalInputValue = undefined | string | number;
export const modalCloseReasons = ['close', 'cancel', 'confirm'] as const;
export type ModalCloseReason = typeof modalCloseReasons[number];
