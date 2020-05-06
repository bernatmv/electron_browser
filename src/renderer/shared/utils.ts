import { BaseAction } from "common/types";

export const createReducer = <T, U extends BaseAction>(
  initialState: T
) => (reducerMap: { [key: string]: (state: T, action: U) => T }) => (
  state = initialState,
  action: U
) => {
  const reducer = reducerMap[action.type];
  return reducer ? reducer(state, action) : state;
};
