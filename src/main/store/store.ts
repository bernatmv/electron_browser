import { forwardToRenderer, replayActionMain } from "electron-redux";
import {
  createStore,
  applyMiddleware,
  compose,
  Store,
  CombinedState,
  AnyAction,
} from "redux";
import createLogger from "common/middlewares/logger-middleware";
import { rootReducer } from "./modules/root";
import { AppState } from "common/types";

export default function configureStore(
  initialState: AppState
): Store<CombinedState<AppState>, AnyAction> {
  const store = createStore(
    rootReducer,
    initialState,
    compose(applyMiddleware(createLogger(true), forwardToRenderer))
  );

  replayActionMain(store);

  return store;
}
