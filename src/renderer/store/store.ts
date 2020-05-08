import {
  forwardToMain,
  replayActionRenderer,
  getInitialStateRenderer,
} from "electron-redux";
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
import { epicMiddleware } from "common/middlewares/epic-middleware";
import { AppState } from "common/types";

const composeEnhancers =
  (window["__REDUX_DEVTOOLS_EXTENSION_COMPOSE__"] as typeof compose) || compose;

export default function configureStore(
  initialState: AppState
): Store<CombinedState<AppState>, AnyAction> {
  const store = createStore(
    rootReducer,
    { ...initialState, ...getInitialStateRenderer() },
    composeEnhancers(
      applyMiddleware(forwardToMain, createLogger(true, false), epicMiddleware)
    )
  );

  epicMiddleware.run(rootEpic);

  replayActionRenderer(store);

  return store;
}
