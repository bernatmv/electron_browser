import { combineEpics } from "redux-observable";
import { combineReducers, CombinedState, AnyAction, Reducer } from "redux";
import * as reducers from "../../ducks";
import { RendererState } from "../initial-state";
import { epics } from "../../ducks/epics";
import { catchError } from "rxjs/operators";

export const rootReducer = combineReducers(reducers) as Reducer<
  CombinedState<RendererState>,
  AnyAction
>;

export const rootEpic = (action$, store$, dependencies) =>
  combineEpics(...epics)(action$, store$, dependencies).pipe(
    catchError((error, source) => {
      console.error(error);
      return source;
    })
  );
