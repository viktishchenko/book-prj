import { Injectable } from '@angular/core';
import { IIssue } from './issue';

@Injectable({
  providedIn: 'root',
})
export class IssueService {
  private issues: IIssue[] = [];

  constructor() {}

  getPandingIssues() {
    this.issues.filter((issue) => !issue.completed);
  }
}
