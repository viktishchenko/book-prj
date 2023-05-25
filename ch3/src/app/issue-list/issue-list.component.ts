import { Component, OnInit } from '@angular/core';
import { IssueService } from '../issue.service';
import { IIssue } from '../issue';

@Component({
  selector: 'app-issue-list',
  templateUrl: './issue-list.component.html',
  styleUrls: ['./issue-list.component.css'],
})
export class IssueListComponent implements OnInit {
  issues: IIssue[] = [];
  showReportIssue = false;

  constructor(private issueService: IssueService) {}

  ngOnInit(): void {
    this.getIssues();
  }

  private getIssues() {
    this.issues = this.issueService.getPendingIssues();
  }

  onCloseReport() {
    this.showReportIssue = false;
    this.getIssues();
  }
}
