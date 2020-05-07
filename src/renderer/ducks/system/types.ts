import { BaseAction } from "common/types";

export const SWITCH_DEV_MODE = "system/SWITCH_DEV_MODE";

// ACTIONS

export interface SwitchDevModeAction extends BaseAction {
  type: typeof SWITCH_DEV_MODE;
}

export type SystemActionTypes = SwitchDevModeAction;

// STATE

export interface SystemState {
  devMode: boolean;
}
