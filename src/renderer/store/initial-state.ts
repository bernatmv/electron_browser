import { AppState } from "common/types";
import { tabsInitialState } from "common/ducks/tabs";
import { systemTypes, systemInitialState } from "../ducks/system";

export interface RendererState extends AppState {
  system: systemTypes.SystemState;
}

const initialState: RendererState = {
  system: systemInitialState,
  tabs: tabsInitialState,
};

export default initialState;
