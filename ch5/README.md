# ElEdit

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 15.2.2.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.

---

<details>

<summary>ep.1</summary>

- init desktop angular app w text-editor lib

```js

ng new el-edit --defaults --directory ./ // --minimal

// text editor
npm i ngx-wig@15.1.4
```

- add host comp for editor

```js

ng g c views/editor --skip-tests  --dry-run

// editor.component
<ngx-wig placeholder="Enter your content"></ngx-wig>
```

![Alt text](src/readmeAssets/init-editor.png)

</details>

<details>

<summary>ep.2</summary>

- convert it into a desktop one using Electron

```js

npm install -D electron
PS D:\work\prj-book\ch5\src> mkdir electron
PS D:\work\prj-book\ch5\src> cd .\electron\
PS D:\work\prj-book\ch5\src\electron> New-Item main.js

// init window
import { app, BrowserWindow } from 'electron';
function createWindow () {
const mainWindow = new BrowserWindow({
width: 800,
height: 600
});
mainWindow.loadFile('index.html');
}
app.whenReady().then(() => {
createWindow();
});
```

- add webpack CLI (build & bundle electron app)

```js

npm install -D webpack-cli
```

- add ts-loader f webpack

```js

npm install -D ts-loader

// run the Angular and Electron applications in parallel w:
npm install -D concurrently
webpack.dev.config.js
webpack.config.js
webpack.prod.config.js
// add to run
"start:desktop": "concurrently \"ng build --delete-output-path=false --watch\" \"webpack --config webpack.dev.config.js --watch\"",
/* the Angular CLI will delete the dist folder by default. To prevent this behavior using the --delete-
output-path=false option because the Electron application is also built in the same folder. */
```

- add launch.json file w (Run and Debug → create a launch.json)

```js
"program": "${workspaceRoot}/dist/my-editor/shell.js",
"runtimeExecutable": "${workspaceRoot}/node_modules/.bin/electron"
```

```js
npm run start:desktop
```

![Alt text](src/readmeAssets/run-electron.png)

</details>

<details>

<summary>ep.3</summary>

- configuring the Angular CLI workspace
  `src/electron/main.ts`, `tsconfig.app.ts`

- make the window object injectable
  `src/app/window.ts`

```js
import { InjectionToken } from "@angular/core";
export const WINDOW =
  new InjectionToken() <
  Window >
  ("Global window object",
  {
    factory: () => window,
  });
export interface ElectronWindow extends Window {
  require(module: string): any;
}
```

<!-- Electron is loaded using the require method of the window object, which is available only in the Node.js environment. To use it in an Angular application, we create the ElectronWindow interface that extends the Window interface by defining that method. The Angular and Electron applications are now ready to interact with each other using the IPC mechanism. -->

- interacting w editor

```js
//add service
ng g s services/editor --dry-run
```

<details>

<summary>service</summary>

```js
import { Inject } from '@angular/core';
import { Injectable } from '@angular/core';
import { ElectronWindow, WINDOW } from '../window';

@Injectable({
  providedIn: 'root',
})
export class EditorService {
  private get ipcRenderer(): Electron.IpcRenderer {
    return this.window.require('electron').ipcRenderer;
  }

  constructor(@Inject(WINDOW) private window: ElectronWindow) {}

  getContent(): Promise<string> {
    return this.ipcRenderer.invoke('getContent');
  }

  setContent(content: string) {
    this.ipcRenderer.invoke('setContent', content);
  }
}
```

</details>
<details>

<summary>component</summary>

`.ts`

```js
import { Component, OnInit } from '@angular/core';
import { EditorService } from 'src/app/services/editor.service';

@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.css'],
})
export class EditorComponent implements OnInit {
  myContent = '';

  constructor(private editorService: EditorService) {}

  ngOnInit(): void {
    this.getContent();
  }

  private async getContent() {
    this.myContent = await this.editorService.getContent();
  }
}
```

`.html`

```html
<ngx-wig placeholder="Enter your content" [ngModel]="myContent" (contentChange)="saveContent($event)"></ngx-wig>
```

</details>

</details>
