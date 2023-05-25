import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { IssueService } from '../issue.service';

@Component({
  selector: 'app-issue-report',
  templateUrl: './issue-report.component.html',
  styleUrls: ['./issue-report.component.css'],
})
export class IssueReportComponent implements OnInit {
  issueForm: FormGroup | undefined;

  constructor(private form: FormBuilder, private issueService: IssueService) {}

  ngOnInit(): void {
    this.issueForm = this.form.group({
      title: [''],
      description: [''],
      priority: [''],
      type: [''],
    });
  }

  addIssue() {
    this.issueService.createIssue(this.issueForm?.value);
  }
}
