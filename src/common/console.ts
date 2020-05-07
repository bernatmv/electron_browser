export const REGULAR = ["background: blue", "color: white"].join(";");
export const SUCCESS = ["background: green", "color: white"].join(";");
export const STARTED = ["background: darkorange", "color: white"].join(";");
export const FAILURE = ["background: red", "color: white"].join(";");

export function logGroupCollapsed(...args) {
  const logFunction =
    typeof console.groupCollapsed === "function"
      ? console.groupCollapsed
      : console.info;
  logFunction(...args);
}

export function logGroupEnd(...args) {
  const logFunction =
    typeof console.groupEnd === "function" ? console.groupEnd : console.info;
  logFunction(...args);
}

export function logInfo(...args) {
  console.info(...args);
}
