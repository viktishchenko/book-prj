import { Component, EventEmitter, Input, Output } from '@angular/core';
import { IIssue } from '../issue';
import { NgModel } from '@angular/forms';
import { IssueService } from '../issue.service';

@Component({
  selector: 'app-edit-details',
  templateUrl: './edit-details.component.html',
  styleUrls: ['./edit-details.component.css'],
})
export class EditDetailsComponent {
  @Input()
  issue?: IIssue;
  @Output() reset = new EventEmitter();
  @Output() save = new EventEmitter();

  constructor(private issueService: IssueService) {}

  updateIssue(issue: IIssue) {
    console.log('SAVE THIS!', issue);
    this.issueService.updateIssue(issue);
  }

  formData(title: NgModel, description: NgModel) {
    console.log('title, description>>', title, description);
  }
}
