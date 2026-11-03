export const BOARD_MENU_TOGGLE_EVENT = 'xzqh:board-menu-toggle';
export const BOARD_MENU_STATE_EVENT = 'xzqh:board-menu-state';

export function toggleBoardMenu(): void {
  window.dispatchEvent(new CustomEvent(BOARD_MENU_TOGGLE_EVENT));
}

export function setBoardMenuAvailable(available: boolean, open = false): void {
  window.dispatchEvent(
    new CustomEvent(BOARD_MENU_STATE_EVENT, { detail: { available, open } }),
  );
}
