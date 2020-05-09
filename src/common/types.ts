// Configuration shape

export interface Configuration {
  layout: {
    windowDefaultWidth: number;
    windowDefaultHeight: number;
    windowHeaderHeight: number;
    navigationHeight: number;
    footerHeight: number;
  };
  navigation: {
    defaultUrl: string;
  };
}

// Actions

export interface BaseAction {
  type: string;
  meta?: { scope?: string; async?: boolean };
}

// STATE SHAPE

export interface Tab {
  id: string;
  url: string;
  loading: boolean;
  canGoBack: boolean;
  canGoForward: boolean;
}

export interface TabsState {
  tabs: Tab[];
  active: string;
}

export interface AppState {
  tabs: TabsState;
}
