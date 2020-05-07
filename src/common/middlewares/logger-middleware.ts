import { includes, filter, isEmpty } from "ramda";
import {
  REGULAR,
  SUCCESS,
  FAILURE,
  STARTED,
  logGroupCollapsed,
  logInfo,
  logGroupEnd,
} from "common/console";

const ignoreActions: string[] = [];

function determineStyle(action) {
  if (!action.meta || !action.meta.async) {
    return REGULAR;
  }

  if (action.type.indexOf("_FULFILLED") > -1) {
    return SUCCESS;
  }

  if (action.type.indexOf("_FAILED") > -1) {
    return FAILURE;
  }

  return STARTED;
}

const createLogger = (active = true) => store => next => action => {
  if (
    !active ||
    !isEmpty(
      filter(
        ignoredAction => includes(ignoredAction, action.type),
        ignoreActions
      )
    )
  ) {
    return next(action);
  }

  const prevState = store.getState();
  const result = next(action);
  const nextState = store.getState();

  logGroupCollapsed(`%c ${action.type} `, determineStyle(action));
  logInfo("%cprev state", "color: darkorange", prevState);
  logInfo("%caction payload", "color: blue", action.payload);
  logInfo("%cnext state", "color: darkgreen", nextState);
  logGroupEnd();

  return result;
};

export default createLogger;
