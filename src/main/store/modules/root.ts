import { combineReducers, CombinedState, AnyAction, Reducer } from "redux";
import * as reducers from "../../ducks";
import { AppState } from "common/types";
import { BehaviorSubject } from "rxjs";
import { combineEpics, Epic } from "redux-observable";
import { epics } from "common/ducks/epics";
import { mergeMap, catchError } from "rxjs/operators";

export const rootReducer = combineReducers(reducers) as Reducer<
  CombinedState<AppState>,
  AnyAction
>;

export const epic$ = new BehaviorSubject(combineEpics(...epics));

export const rootEpic: Epic<any, any, any, any> = (action$, state$) =>
  epic$.pipe(
    mergeMap(epic => epic(action$, state$)),
    catchError((error, source) => {
      console.error(error);
      return source;
    })
  );
