import * as R from "ramda";

export const createReducer = <T>(initialState: T) => (reducerMap: {
  [key: string]: (state: T, action?) => T;
}) => (state = initialState, action?) => {
  const reducer = reducerMap[action.type];
  return reducer ? reducer(state, action) : state;
};

export const extractHostname = (url: string): string => {
  let hostname;

  //find & remove protocol (http, ftp, etc.) and get hostname
  if (R.includes("//", url)) {
    hostname = R.path([2], R.split("/", url));
  } else {
    hostname = R.head(R.split("/", url));
  }

  if (R.includes("www", hostname)) {
    hostname = R.slice(4, Infinity, hostname);
  }

  //find & remove port number
  hostname = R.head(R.split(":", hostname));
  //find & remove "?"
  hostname = R.head(R.split("?", hostname));

  return hostname;
};
