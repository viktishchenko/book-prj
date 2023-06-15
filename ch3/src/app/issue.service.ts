import { Injectable } from '@angular/core';
import { IIssue } from './issue';
import { issues } from 'src/assets/issues';

@Injectable({
  providedIn: 'root',
})
export class IssueService {
  private issues: IIssue[] = issues;

  constructor() {}

  getPendingIssues(): IIssue[] {
    return this.issues.filter((issue) => !issue.completed);
  }

  createIssue(issue: IIssue) {
    issue.issueNo = this.issues.length + 1;
    this.issues.push(issue);
  }

  updateIssue(issueNo: number, issue: IIssue) {
    console.log(`THE ISSUE  NUMBER: ${issue.issueNo}, WAS UPDATED!!!`);
    const currentIssue = this.issues.find((i) => {
      return i.issueNo === issueNo;
    });
    console.log('currentIssue>>', currentIssue);
    if (currentIssue) {
      const index = this.issues.indexOf(currentIssue);
      this.issues[index] = {
        ...currentIssue,
        ...issue,
      };
    }
  }

  completeIssue(issue: IIssue) {
    const selectedIssue: IIssue = {
      ...issue,
      completed: new Date(),
    };
    const index = this.issues.findIndex((i) => i === issue);
    this.issues[index] = selectedIssue;
  }

  getSuggestion(title: string): IIssue[] {
    if (title.length > 3) {
      return this.issues.filter((issue) => issue.title.indexOf(title) !== -1);
    }
    return [];
  }
}
