import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UserRequest } from '../../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private apiUrl: string = 'http://localhost:8080/api/users';

  constructor(private http: HttpClient) { }


  createUser(userRequest: UserRequest): Observable<any> {
    return this.http.post(`${this.apiUrl}/create`, userRequest );
  }
}
