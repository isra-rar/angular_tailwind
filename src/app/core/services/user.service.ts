import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UserRequest } from '../../models/user.model';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private http = inject(HttpClient)

  createUser(userRequest: UserRequest): Observable<any> {
    return this.http.post(`${environment.api.users}/create`, userRequest );
  }
}
