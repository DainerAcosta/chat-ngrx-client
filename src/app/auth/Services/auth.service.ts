import { Injectable } from '@angular/core';
import { of, Observable } from "rxjs";
import { delay } from 'rxjs/operators';
import { IUser } from "../../interfaces/IUser";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  userFake: IUser = {
    username: 'daineracosta',
    email: 'daine@co.com',
    password: '123456'
  }

  constructor() { }

  login(user: IUser): Observable<any> {
    let toSend = {
      isLoading: false,
      error: true,
      user 
    };
    if (JSON.stringify(user) === JSON.stringify(this.userFake)) {
      toSend = {
        isLoading: false,
        error: false,
        user 
      };;
    }
    return of (toSend).pipe(delay(5000));
  }
}
