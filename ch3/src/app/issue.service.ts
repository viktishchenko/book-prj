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
}
