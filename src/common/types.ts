export interface BaseAction {
  type: string;
  meta?: { scope: string };
}

// STATE SHAPE

export interface ElectronState {
  color: string;
}

export interface AppState {
  electron: ElectronState;
}
