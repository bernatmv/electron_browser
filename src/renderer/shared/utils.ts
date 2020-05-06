export const createReducer = <T>(initialState: T) => (reducerMap: {
  [key: string]: (state: T, action?) => T;
}) => (state = initialState, action?) => {
  const reducer = reducerMap[action.type];
  return reducer ? reducer(state, action) : state;
};
