import { BrowserView, BrowserWindow } from "electron";
import normalizeUrl from "normalize-url";
import * as R from "ramda";
import { Epic, ofType } from "redux-observable";
import {
  TabActionTypes,
  TAB_REMOVE,
  TabNavigateAction,
  TAB_NAVIGATE,
  TabGoToOffsetAction,
  TAB_GO_TO_OFFSET,
} from "common/ducks/tabs/types";
import { filter, ignoreElements, takeUntil, tap } from "rxjs/operators";
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
              tabsOperations.tabNavigateFulFilled({
                id: action.payload.id,
                url: this.view.webContents.getURL(),
                canGoBack: this.view.webContents.canGoBack(),
                canGoForward: this.view.webContents.canGoForward(),
              })
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

    const tabGoOffsetEpic: Epic<
      TabActionTypes,
      TabGoToOffsetAction,
      AppState
    > = action$ =>
      action$.pipe(
        ofType(TAB_GO_TO_OFFSET),
        filter(action => action.payload.id === this.id),
        tap(action => {
          const offset = (action as TabGoToOffsetAction).payload.offset;

          this.view.webContents.goToOffset(offset);

          this.store.dispatch(
            tabsOperations.tabNavigateFulFilled({
              id: action.payload.id,
              url: R.pathOr(
                "",
                // weirdly enough these method/property are not typed on the library :shrug:
                [(this.view.webContents as any).getActiveIndex()],
                (this.view.webContents as any).history
              ),
              canGoBack: this.view.webContents.canGoBack(),
              canGoForward: this.view.webContents.canGoForward(),
            })
          );
        }),
        ignoreElements(),
        takeUntil(
          action$.pipe(
            ofType(TAB_REMOVE),
            filter(action => action.payload.id === this.id)
          )
        )
      );

    epic$.next(tabNavigatEpic);
    epic$.next(tabGoOffsetEpic);
  }
}

export default BrowserTab;
