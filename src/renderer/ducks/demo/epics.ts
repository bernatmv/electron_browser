import { mapTo } from "rxjs/operators";
import { Epic, ofType } from "redux-observable";
import {
  APPEND_TEXT,
  DemoState,
  APPEND_ICON,
  AppendIconAction,
  DemoActionTypes,
} from "./types";

const appendTextEpic: Epic<
  DemoActionTypes,
  AppendIconAction,
  DemoState
> = action$ => action$.pipe(ofType(APPEND_TEXT), mapTo({ type: APPEND_ICON }));

export default [appendTextEpic];
