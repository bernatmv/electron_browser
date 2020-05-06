import { demoInitialState, demoTypes } from "../ducks/demo";

export interface AppState {
  demo: demoTypes.DemoState;
}

const initialState = {
  demo: demoInitialState,
};

export default initialState;
