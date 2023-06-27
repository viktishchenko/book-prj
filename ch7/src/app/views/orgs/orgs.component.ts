import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { IOrgs } from 'src/app/modules/orgs';
import { GithubService } from 'src/app/services/github.service';

@Component({
  selector: 'app-orgs',
  template: `
    <app-panel caption="Organizations" icon="diagram-3">
      <div class="list-group">
        <a
          href="https://www.github.com/{{ org.login }}"
          class="list-group-item list-group-item-action"
          *ngFor="let org of orgs$ | async"
        >
          <div class="row">
            <img [src]="org.avatar_url" />
            <div class="col-sm-9">
              <div class="d-flex w-100 justify-content-between">
                <h5 class="mb-1">{{ org.login }}</h5>
              </div>
              <p class="mb-1">{{ org.description }}</p>
            </div>
          </div>
        </a>
      </div>
    </app-panel>
  `,
  styles: [
    `
      img {
        width: 60px;
        height: 40px;
      }
    `,
  ],
})
export class OrgsComponent implements OnInit {
  orgs$?: Observable<IOrgs[]>;

  constructor(private githubService: GithubService) {}

  ngOnInit(): void {
    this.orgs$ = this.githubService.getOrgs();
  }
}
