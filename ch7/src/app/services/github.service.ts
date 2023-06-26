import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IUser } from '../modules/user';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class GithubService {
  constructor(private http: HttpClient) {}

  getUser(): Observable<IUser> {
    return this.http.get<IUser>(
      `${environment.apiUrl}/users/${environment.username}`
    );
  }
}
