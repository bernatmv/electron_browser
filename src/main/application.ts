import { app, BrowserWindow } from "electron";
import * as path from "path";
import * as R from "ramda";
import { format as formatUrl } from "url";
import { v4 as uuidv4 } from "uuid";
import configureStore from "./store/store";
import initialState from "./store/initial-state";
import { Store } from "redux";
import { tabsOperations } from "common/ducks/tabs";
import BrowserTab from "./components/browser-tab";
import { Epic, ofType } from "redux-observable";
import {
  TabActionTypes,
  TabAddAction,
  TAB_ADD,
  TabSetActiveAction,
  TAB_SET_ACTIVE,
  TabRemoveAction,
  TAB_REMOVE,
} from "common/ducks/tabs/types";
import { AppState } from "common/types";
import { epic$ } from "./store/modules/root";
import { tap, ignoreElements } from "rxjs/operators";
import { config } from "common/config/config";

class Application {
  private mainWindow: BrowserWindow = null;
  private tabs: BrowserTab[] = [];
  private store: Store = null;

  constructor(private isDevelopment: boolean) {}

  public async setup(): Promise<void> {
    try {
      // store
      this.store = configureStore(initialState);
      // epics
      this.registerEpics();
      // other listeners
      this.listenForTemination();
      this.listenForUnhandledError();
    } catch (error) {
      console.error(
        `main-process.app.setup: an error has occurred: ${error}\n${error.stack}`
      );
    }
  }

  public async start(): Promise<void> {
    try {
      // quit application when all windows are closed
      app.on("window-all-closed", () => {
        // on macOS it is common for applications to stay open until the user explicitly quits
        if (process.platform !== "darwin") {
          app.quit();
        }
      });

      app.on("activate", () => {
        // on macOS it is common to re-create a window even after all windows have been closed
        if (this.mainWindow === null) {
          this.mainWindow = this.createMainWindow();
        }
      });

      // create main BrowserWindow when electron is ready
      app.on("ready", () => {
        this.mainWindow = this.createMainWindow();
      });
    } catch (error) {
      console.error(
        `main-process.app.start: an error has occurred: ${error}\n${error.stack}`
      );
    }
  }

  public async stop(): Promise<void> {
    process.exit();
    // Force close after .5 secs
    setTimeout(() => {
      console.error(`main-process.app.stop: process forcefully terminated`);
      process.exit(1);
    }, 500);
  }

  // Listeners

  private listenForTemination(): void {
    console.log(
      `main-process.app.listenForTemination: listening to process events to gracefully shutdown`
    );
    // listen for TERM signal .e.g. kill
    process.on("SIGTERM", () => this.stop());

    // listen for INT signal e.g. Ctrl-C
    process.on("SIGINT", () => this.stop());

    // catches "kill pid" (for example: nodemon restart)
    process.once("SIGUSR1", () => this.stop());
    // this is the signal the nodemon send to restart the application
    process.once("SIGUSR2", async () => {
      console.log(`main-process.app.listenForTemination: graceful shutdown`);
      await this.stop();
      process.kill(process.pid, "SIGUSR2");
    });

    // catches uncaught exceptions
    process.on("uncaughtException", () => this.stop());

    // Detect a shutdown from PM2
    process.on("message", message => {
      if (message === "shutdown") {
        this.stop();
      }
    });
  }

  private listenForUnhandledError(): void {
    // catch the uncaught errors that weren't wrapped in a domain or try catch statement
    process.on("uncaughtException", error => {
      // handle the error safely
      console.error(
        `main-process.app.listenForTemination: unhandled error ${error}\n${error.stack}`
      );
    });
  }

  // Windows management

  private createMainWindow(): BrowserWindow {
    const window = new BrowserWindow({
      width: config.layout.windowDefaultWidth,
      height: config.layout.windowDefaultHeight,
      webPreferences: { nodeIntegration: true },
    });

    if (this.isDevelopment) {
      window.webContents.openDevTools({ mode: "detach" });
    }

    if (this.isDevelopment) {
      window.loadURL(
        `http://localhost:${process.env.ELECTRON_WEBPACK_WDS_PORT}`
      );
    } else {
      window.loadURL(
        formatUrl({
          pathname: path.join(__dirname, "index.html"),
          protocol: "file",
          slashes: true,
        })
      );
    }

    window.on("show", () => {
      // we will add a default tab if none exist
      if (R.isEmpty(this.tabs)) {
        this.store.dispatch(tabsOperations.tabAdd({ id: uuidv4() }));
      }
    });

    window.on("closed", () => {
      this.mainWindow = null;
    });

    window.webContents.on("devtools-opened", () => {
      window.focus();
      setImmediate(() => {
        window.focus();
      });
    });

    return window;
  }

  private calculateViewBounds(): Electron.Rectangle {
    const windowBounds = this.mainWindow.getBounds();

    return {
      x: 0,
      y: config.layout.navigationHeight,
      width: windowBounds.width,
      height:
        windowBounds.height -
        config.layout.navigationHeight -
        config.layout.footerHeight -
        config.layout.windowHeaderHeight,
    };
  }

  // Epics

  private registerEpics() {
    const tabAddEpic: Epic<TabActionTypes, TabAddAction, AppState> = action$ =>
      action$.pipe(
        ofType(TAB_ADD),
        tap(action => {
          const tab = new BrowserTab(
            action.payload.id,
            this.store,
            this.mainWindow,
            this.calculateViewBounds(),
            config.navigation.defaultUrl
          );

          this.tabs.push(tab);
        }),
        ignoreElements()
      );

    const tabSetActiveEpic: Epic<
      TabActionTypes,
      TabSetActiveAction,
      AppState
    > = action$ =>
      action$.pipe(
        ofType(TAB_SET_ACTIVE),
        tap(action => {
          const id = action.payload.id;

          R.forEach(
            tab =>
              tab.id === id
                ? this.mainWindow.addBrowserView(tab.view)
                : this.mainWindow.removeBrowserView(tab.view),
            this.tabs
          );
        }),
        ignoreElements()
      );

    const tabRemoveEpic: Epic<
      TabActionTypes,
      TabRemoveAction,
      AppState
    > = action$ =>
      action$.pipe(
        ofType(TAB_REMOVE),
        tap(action => {
          const removedTab = R.find(
            tab => tab.id === action.payload.id,
            this.tabs
          );

          this.mainWindow.removeBrowserView(removedTab?.view);
          this.tabs = R.filter(tab => tab.id !== action.payload.id, this.tabs);
        }),
        ignoreElements()
      );

    epic$.next(tabAddEpic);
    epic$.next(tabSetActiveEpic);
    epic$.next(tabRemoveEpic);
  }
}

export default Application;
