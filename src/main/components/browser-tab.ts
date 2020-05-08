import { BrowserView, BrowserWindow } from "electron";
import normalizeUrl from "normalize-url";
import { Epic, ofType } from "redux-observable";
import {
  TabActionTypes,
  TAB_REMOVE,
  TabNavigateAction,
  TAB_NAVIGATE,
  TAB_NAVIGATE_FULFILLED,
} from "common/ducks/tabs/types";
import { filter, ignoreElements, takeUntil, tap, mapTo } from "rxjs/operators";
import { AppState } from "common/types";
import { epic$ } from "../store/modules/root";
import { Store, AnyAction } from "redux";
import { tabsOperations } from "common/ducks/tabs";

class BrowserTab {
  public view: BrowserView;

  constructor(
    public id: string,
    private store: Store<any, AnyAction>,
    parentWindow: BrowserWindow,
    bounds: Electron.Rectangle,
    url: string
  ) {
    // BrowserView
    this.view = new BrowserView({ webPreferences: { nodeIntegration: false } });
    parentWindow.addBrowserView(this.view);
    this.view.setBounds(bounds);
    this.view.webContents.loadURL(url);
    this.view.setAutoResize({
      width: true,
      height: true,
      horizontal: false,
      vertical: false,
    });

    this.registerEpics();
  }

  public resize(bounds: Electron.Rectangle) {
    this.view.setBounds(bounds);
  }

  public async navigate(url: string) {
    try {
      return this.view.webContents.loadURL(
        normalizeUrl(url, {
          stripWWW: false,
          removeTrailingSlash: false,
        })
      );
    } catch (error) {
      // noop
    }

    return this.view.webContents.loadURL(url);
  }

  private registerEpics() {
    const tabNavigatEpic: Epic<
      TabActionTypes,
      TabNavigateAction,
      AppState
    > = action$ =>
      action$.pipe(
        ofType(TAB_NAVIGATE),
        filter(action => action.payload.id === this.id),
        tap(action =>
          this.navigate((action as TabNavigateAction).payload.url).then(() => {
            this.store.dispatch(
              tabsOperations.tabNavigateFulFilled({ id: action.payload.id })
            );
          })
        ),
        ignoreElements(),
        takeUntil(
          action$.pipe(
            ofType(TAB_REMOVE),
            filter(action => action.payload.id === this.id)
          )
        )
      );

    epic$.next(tabNavigatEpic);
  }
}

export default BrowserTab;
