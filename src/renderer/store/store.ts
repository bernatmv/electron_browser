import {
  createStore,
  applyMiddleware,
  compose,
  Store,
  CombinedState,
  AnyAction,
} from "redux";
import { AppState } from "./initial-state";
import createLogger from "./middlewares/logger-middleware";
import { rootReducer, rootEpic } from "./modules/root";
import { epicMiddleware } from "./middlewares/epic-middleware";

const composeEnhancers =
  (window["__REDUX_DEVTOOLS_EXTENSION_COMPOSE__"] as typeof compose) || compose;

export default function configureStore(
  initialState: AppState
): Store<CombinedState<AppState>, AnyAction> {
  const store = createStore(
    rootReducer,
    initialState,
    composeEnhancers(applyMiddleware(createLogger(true), epicMiddleware))
  );

  epicMiddleware.run(rootEpic);

  return store;
}
