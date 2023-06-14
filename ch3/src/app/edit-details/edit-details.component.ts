import { Component, EventEmitter, Input, Output } from '@angular/core';
import { IIssue } from '../issue';

@Component({
  selector: 'app-edit-details',
  templateUrl: './edit-details.component.html',
  styleUrls: ['./edit-details.component.css'],
})
export class EditDetailsComponent {
  @Input()
  issue?: IIssue;
  @Output() reset = new EventEmitter();

  saveChanges() {
    console.log('SAVE THIS!');
  }
}
