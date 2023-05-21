# ch3 prj

<details>
  <summary>ch3</summary>
  
  ### is-tracker app

```js
// --defaults: disables Angular routing and sets the styles CSS.
ng new is-tracker --defaults  --directory ./

// add Clarity library
npm i @clr/angular@15.2.0 // !
npm i @clr/ui@15.2.0    // !
npm install @cds/core

// add styles
`angular.json`
"styles": [
"node_modules/@clr/ui/clr-ui.min.css",
]

// import clarity + browser animation module
`app.module.ts`
import { ClarityModule } from '@clr/angular';
import { BrowserAnimationsModule } from
'@angular/platform-browser/animations';

@NgModule({
declarations:
imports: [
ClarityModule,
BrowserAnimationsModule
],

```

</details>

<details>
  <summary>ch3.1</summary>

- add service w interface

```js
ng g s issue --skip-tests --dry-run
ng generate interface issue
```

- get all pending cases w service

```js
getAllPendingCases(){
   return this.issues.filter(issue=>!issue.completed)
}
```

- add component, display data w clarity

```js
ng generate component issue-list dry-run

// property binding e.g.
[class.label-danger]="issue.priority === 'high'"
```

- [class & style binding](https://angular.io/guide/class-binding)

```js
[class.label-danger]="issue.priority === 'high'"
```

![Alt text](src/readmeAssets/is-comp.png)

</details>
