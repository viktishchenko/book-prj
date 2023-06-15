import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { IIssue } from '../issue';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IssueService } from '../issue.service';

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
    });
  }

  save() {
    console.log('SAVE WORKS!');
    if (this.issue) {
      this.issueService.updateIssue(this.issue.issueNo, this.issueForm?.value);
      this.reset.emit();
    }
  }
}
