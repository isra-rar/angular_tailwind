import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StatePropsService {

  private isLoginModeSource = new BehaviorSubject<boolean>(true);
  isLoginMode$ = this.isLoginModeSource.asObservable();

  constructor() { }


  toggleLoginMode() {
    this.isLoginModeSource.next(!this.isLoginModeSource.value); // next envia um novo valor para o observable
  }

  setLoginMode(mode: boolean) {
    this.isLoginModeSource.next(mode);
  }
}
