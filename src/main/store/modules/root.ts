import { combineReducers, CombinedState, AnyAction, Reducer } from "redux";
import * as reducers from "../../ducks";
import { AppState } from "common/types";

export const rootReducer = combineReducers(reducers) as Reducer<
  CombinedState<AppState>,
  AnyAction
>;
