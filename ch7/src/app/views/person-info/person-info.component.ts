import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { IUser } from 'src/app/modules/user';
import { GithubService } from 'src/app/services/github.service';

@Component({
  selector: 'app-person-info',
  templateUrl: './person-info.component.html',
  styleUrls: ['./person-info.component.scss'],
})
export class PersonInfoComponent implements OnInit {
  user$: Observable<IUser> | undefined;

  constructor(private githubService: GithubService) {}

  ngOnInit(): void {
    this.user$ = this.githubService.getUser();
  }
}
