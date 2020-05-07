export const CHANGE_COLOR = "electron/CHANGE_COLOR";

// ACTIONS

export interface ChangeColorPayload {
  color: string;
}

export interface ChangeColorAction {
  type: typeof CHANGE_COLOR;
  payload: ChangeColorPayload;
}

export type ElectronActionTypes = ChangeColorAction;
