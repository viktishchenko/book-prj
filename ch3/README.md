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

<details>
  <summary>ch3.2</summary>

### reporting new issues (Angular reactive forms)

- set up reactive forms
- create issue form
- display issue list
- validating details

`app.module.ts`

```js
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
imports: [
ReactiveFormsModule
],
})
```

- add comp, reactive forms, addIssueMethod

```js
ng g c  issue-report --dry-run


// init reactive form

`ts`

  issueForm: FormGroup | undefined;

  constructor(private form: FormBuilder) {}

  ngOnInit(): void {
    this.issueForm = this.form.group({
      title: [''],
      description: [''],
      priority: [''],
      type: [''],
    });
  }

`html`
// basic
<form clrForm *ngIf="issueForm" [formGroup]="issueForm">
    <input clrInput formControlName="title" />
    <textarea clrTextarea formControlName="description"></textarea>
      <input type="radio" value="low" clrRadio formControlName="priority" />
      <input type="radio" value="high" clrRadio formControlName="priority" />
    <select clrSelect formControlName="type">
      <option value="Feature">Feature</option>
      <option value="Bug">Bug</option>
      <option value="Documentation">Documentation</option>
    </select>
  <button class="btn btn-primary" type="submit">Create</button>
</form>

```

![Alt text](src/readmeAssets/report-comp.png)

- pass form value to issues object

```js
`issue-report.component.html`
// submit reactive form

(ngSubmit) = addIssue();

`issue-report.component.ts`
//add service
constructor(private issueService: IssueService){}

addIssue(){
  this.issueService.createIssue(this.issueForm?.value)
}

```

![Alt text](src/readmeAssets/is-object.png)

- displaying a new issue in the list
  - add EventEmitter property w @Output() decorator

`issue-report.component.ts`

```js
@Output() formClose = new EventEmitter();

addIssue() {
  this.formClose.emit();
}
```

`issue-report.component.html`

```js

<button (click)="formClose.emit()" class="btn" type="button">Cancel</button>
```

- IssueListComponent bind to the formClose event of IssueReportComponent

`issue-list.component.html`

```js
<app-issue-report
  *ngIf="showReportIssue == true"
  (formClose)="onCloseReport()"
></app-issue-report>

```

`issue-list.component.ts`

```js

showReportIssue = false;

onCloseReport() {
this.showReportIssue = false;
this.getIssues();
}

```

</details>

<details>
<summary>ch3.3</summary>

- form validation

```js
import { FormBuilder, FormGroup, Validators } from
'@angular/forms';

ngOnInit(): void {
this.issueForm = this.builder.group({
title: ['', Validators.required],
description: [''],
priority: ['', Validators.required],
type: ['', Validators.required]
});
}


addIssue() {
  if (this.issueForm && this.issueForm.invalid) {
    this.issueForm.markAllAsTouched();
    return;
  }
  ...
}

```

![Alt text](src/readmeAssets/form-validation.png)

### resolving an issue

- add comp

```js
ng g c confirm-dialog --dry-run
```

- add @Input() decorator to get the issue number.

```js
@Input() issueNo: number | null = null;
```

- @Output() decorator will emit a boolean value

```js
@Output() confirm = new EventEmitter<boolean>();

// confirm output property (true || false)
agree() {
this.confirm.emit(true);
this.issueNo = null;
}
disagree() {
this.confirm.emit(false);
this.issueNo = null;
}
```

- clarity modal

```html
<clr-modal [clrModalOpen]="issueNo !== null"
[clrModalClosable]="false">
<button type="button" class="btn btn-outline"
(click)="disagree()">Cancel</button>
<button type="button" class="btn btn-danger"
(click)="agree()">Yes, continue</button>
</div>
</clr-modal>
```

`issue.service.ts`

```js
completeIssue(issue: Issue) {
// clone of the issue
const selectedIssue: Issue = {
...issue,
completed: new Date()
};
// replaces it with the cloned instance
const index = this.issues.findIndex(i => i ===
issue);
this.issues[index] = selectedIssue;
}
```

`issue-list.component.ts`

```js
selectedIssue: Issue | null = null;

onConfirm(confirmed: boolean) {
// call service if confirmed is true w refresh
if (confirmed && this.selectedIssue) {
this.issueService.completeIssue(this.
selectedIssue);
this.getIssues();
}
this.selectedIssue = null;
}
```

`issue-list.component.html`

```html
<clr-dg-action-overflow>
  <button
    class="action-item"
    (click)="selectedIssue
= issue"
  >
    Resolve
  </button>
</clr-dg-action-overflow>

// confirm-dialog
<app-confirm-dialog *ngIf="selectedIssue" [issueNo]="selectedIssue.issueNo" (confirm)="onConfirm($event)"></app-confirm-dialog>
```

![Alt text](src/readmeAssets/add-modal.png)

</details>

<details>
  <summary>ch3.4</summary>

> `Each control` - exposes a valueChanges observable that we can subscribe to and get a continuous stream of values.

`issue-report.componenet.ts`

```js
suggestions: Issue[]= [];

ngOnInit(): void {
this.issueForm.controls.title.valueChanges.subscribe((
title: string) => {
this.suggestions =
this.issueService.getSuggestions(title);
});
}
```

`issue.service.ts`

```js
  getSuggestion(title: string): IIssue[] {
    if (title.length > 3) {
      return this.issues.filter((issue) => issue.title.indexOf(title) !== -1);
    }
    return [];
  }
```

- display the suggested issues on the template w Clarity lib

```html
<div class="clr-row" *ngIf="suggestions.length">
  <div class="clr-col-lg-2"></div>
  <div class="clr-col-lg-6">
    <clr-stack-view>
      <clr-stack-header>Similar issues </clr-stack-header>
      <clr-stack-block
        *ngFor="let issue of
suggestions"
      >
        <clr-stack-label>#{{issue.issueNo}}: {{issue.title}}</clr-stack-label>
        <clr-stack-content>{{issue.description}} </clr-stack-content>
      </clr-stack-block>
    </clr-stack-view>
  </div>
</div>
```

![Alt text](src/readmeAssets/similar-is.png)

</details>

<details>
  <summary>Summary</summary>

## Tracking issues app

- install Clarity w Angular, display list of pending issues
- add reactive form w validations & visual indication required fields (empty fields protection)
- add resolve issue system w Clarity modal dialog
- improve UX w suggest related issues when report about new one

</details>

<details>
  <summary>exercise</summary>

- add edit details comp

```js
ng g c edit-details -dry-run
```

- send selected data to child component

```js
// ch comp
@Input() issue: IIssue | undefined;

//prnt comp
  isEdit = false;
  editSelectedIssue: IIssue | undefined;

  onEdit(issue: IIssue) {
  console.log('EDIT ISSUE #', issue.issueNo);
  this.isEdit = true;
  this.editSelectedIssue = issue;
}

editIssue() {
  return this.editSelectedIssue;
}
```

![Alt text](src/readmeAssets/edit-details.png)

- add goBack functionality

`...details.comp.ts`

```js
@Output() reset = new EventEmitter();

```

`...details.comp.html`

```html
<button (click)="reset.emit()" class="btn" type="button">Go Back</button>
```

**parent-html**
`...is-list.html`

```html
<app-edit-details (reset)="goBack()"> </app-edit-details>
```

**parent-ts**
`...is-list.ts`

```js

goBack(){
  // do smth
}
```

![Alt text](src/readmeAssets/go-back-func.png)

- add update functionality

![Alt text](src/readmeAssets/update-func-ty.png)

</details>
