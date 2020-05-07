import { SwitchDevModeAction, SWITCH_DEV_MODE } from "./types";

export const appendText = (): SwitchDevModeAction => ({
  type: SWITCH_DEV_MODE,
  meta: {
    scope: "local",
  },
});
