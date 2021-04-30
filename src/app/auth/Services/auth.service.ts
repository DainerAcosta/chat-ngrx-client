import { Injectable } from '@angular/core';
import { of, Observable, throwError } from "rxjs";
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

  login({ user }: any): Observable<any> {
    let toSend = {
      isLoading: false,
      error: true,
      ...user 
    };
    console.log(JSON.stringify(user), JSON.stringify(this.userFake));
    if (JSON.stringify(user) === JSON.stringify(this.userFake)) {
      toSend = {
        isLoading: false,
        error: false,
        user: user 
      };
    } else {
      return throwError('Invalid user or password');
    }
    console.log('lo ultimoo', toSend);
    return of(toSend).pipe(delay(5000));
  }
}
