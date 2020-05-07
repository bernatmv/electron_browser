export interface BaseAction {
  type: string;
  meta?: { scope: string };
}

// STATE SHAPE

export interface Tab {
  id: string;
  url: string;
  history: string[];
  forward: string[];
}

export interface TabsState {
  tabs: Tab[];
  active: string;
}

export interface AppState {
  tabs: TabsState;
}
