import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { environment } from "../../../environments/environment";
import { IUser } from '../../interfaces/IUser';
import { catchError, retry } from 'rxjs/operators';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {

  constructor(
    private http: HttpClient,
  ) {}

  login(user: IUser) {
    return this.http.post<any>(`${environment.url_api}/users/userLogin`, user).pipe(
      retry(3),
      catchError(this.handledError)
    )
  }

  handledError(error) {
    return throwError(error);
  }
}
