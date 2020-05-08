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
import { rootReducer, rootEpic } from "./modules/root";
import { AppState } from "common/types";
import { epicMiddleware } from "common/middlewares/epic-middleware";

export default function configureStore(
  initialState: AppState
): Store<CombinedState<AppState>, AnyAction> {
  const store = createStore(
    rootReducer,
    initialState,
    compose(applyMiddleware(createLogger(), epicMiddleware, forwardToRenderer))
  );

  epicMiddleware.run(rootEpic);

  replayActionMain(store);

  return store;
}
