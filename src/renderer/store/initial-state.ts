import { demoInitialState, demoTypes } from "../ducks/demo";
import { AppState } from "common/types";
import { electronInitialState } from "common/ducks/electron";

export interface RendererState extends AppState {
  demo: demoTypes.DemoState;
}

const initialState: RendererState = {
  demo: demoInitialState,
  electron: electronInitialState,
};

export default initialState;
