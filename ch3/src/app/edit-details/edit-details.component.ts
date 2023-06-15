import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { IIssue } from '../issue';
import { IssueService } from '../issue.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-edit-details',
  templateUrl: './edit-details.component.html',
  styleUrls: ['./edit-details.component.css'],
})
export class EditDetailsComponent implements OnInit {
  @Input()
  issue?: IIssue;
  @Output() reset = new EventEmitter();
  issueForm: FormGroup | undefined;

  constructor(
    private builder: FormBuilder,
    private issueService: IssueService
  ) {}

  ngOnInit(): void {
    this.issueForm = this.builder.group({
      title: [this.issue?.title, Validators.required],
      description: [this.issue?.description, Validators.required],
      priority: [this.issue?.priority, Validators.required],
      type: [this.issue?.type, Validators.required],
    });
  }

  save() {
    console.log('UPDATE THIS ISSUE!');
    if (this.issue) {
      this.issueService.updateIssue(this.issue.issueNo, this.issueForm?.value);
    }
    this.reset.emit();
  }
}
