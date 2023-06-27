import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IUser } from '../modules/user';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { IRepository } from '../modules/repository';
import { IOrgs } from '../modules/orgs';

@Injectable({
  providedIn: 'root',
})
export class GithubService {
  private userUrl: string = '';

  constructor(private http: HttpClient) {
    this.userUrl = `${environment.apiUrl}/users/${environment.username}`;
  }

  getUser(): Observable<IUser> {
    return this.http.get<IUser>(this.userUrl);
  }

  getRepos(): Observable<IRepository[]> {
    return this.http.get<IRepository[]>(this.userUrl + '/repos');
  }

  getOrgs(): Observable<IOrgs[]> {
    return this.http.get<IOrgs[]>(this.userUrl + '/orgs');
  }
}
