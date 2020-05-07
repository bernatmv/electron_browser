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
import { RendererState } from "./initial-state";
import createLogger from "common/middlewares/logger-middleware";
import { rootReducer, rootEpic } from "./modules/root";
import { epicMiddleware } from "common/middlewares/epic-middleware";

const composeEnhancers =
  (window["__REDUX_DEVTOOLS_EXTENSION_COMPOSE__"] as typeof compose) || compose;

export default function configureStore(
  initialState: RendererState
): Store<CombinedState<RendererState>, AnyAction> {
  const store = createStore(
    rootReducer,
    { ...initialState, ...getInitialStateRenderer() },
    composeEnhancers(
      applyMiddleware(forwardToMain, createLogger(true), epicMiddleware)
    )
  );

  epicMiddleware.run(rootEpic);

  replayActionRenderer(store);

  return store;
}
