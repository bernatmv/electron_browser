import { ChangeColorPayload, ChangeColorAction, CHANGE_COLOR } from "./types";

export const changeColor = (
  payload: ChangeColorPayload
): ChangeColorAction => ({
  type: CHANGE_COLOR,
  payload,
});
