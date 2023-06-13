import { Component, Input } from '@angular/core';
import { IIssue } from '../issue';

@Component({
  selector: 'app-edit-details',
  templateUrl: './edit-details.component.html',
  styleUrls: ['./edit-details.component.css'],
})
export class EditDetailsComponent {
  @Input()
  issue?: IIssue;

  saveChanges() {
    console.log('SAVE THIS!');
  }

  goBack() {
    console.log('GO BACK!');
  }
}
