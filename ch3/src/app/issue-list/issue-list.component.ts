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
  selectedIssue: IIssue | null = null;
  editSelectedIssue: IIssue | null = null;

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

  onConfirm(confirmed: boolean) {
    if (confirmed && this.selectedIssue) {
      this.issueService.completeIssue(this.selectedIssue);
      this.getIssues();
    }
    this.selectedIssue = null;
  }

  cancelEdit() {
    this.editSelectedIssue = null;
    this.getIssues();
  }
}
