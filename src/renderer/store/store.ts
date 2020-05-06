import {
  createStore,
  applyMiddleware,
  combineReducers,
  compose,
  Store,
  CombinedState,
  AnyAction,
  Reducer,
} from "redux";
import * as reducers from "../ducks";
import { AppState } from "./initial-state";
import createLogger from "./middlewares/logger-middleware";

const composeEnhancers =
  (window["__REDUX_DEVTOOLS_EXTENSION_COMPOSE__"] as typeof compose) || compose;

export default function configureStore(
  initialState: AppState
): Store<CombinedState<AppState>, AnyAction> {
  const rootReducer = combineReducers(reducers) as Reducer<
    CombinedState<AppState>,
    AnyAction
  >;

  const store = createStore(
    rootReducer,
    initialState,
    composeEnhancers(applyMiddleware(createLogger(true)))
  );

  return store;
}
