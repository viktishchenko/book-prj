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
  isEdit = false;
  editSelectedIssue: IIssue | undefined;

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

  onEdit(issue: IIssue) {
    console.log('EDIT ISSUE #', issue.issueNo);
    this.isEdit = true;
    this.editSelectedIssue = issue;
  }

  goBack() {
    this.isEdit = false;
  }

  updatePage() {
    this.isEdit = false;
    this.getIssues();
  }
}
