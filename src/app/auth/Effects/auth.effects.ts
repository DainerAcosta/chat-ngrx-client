import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, exhaustMap, map, tap } from 'rxjs/operators';
import { of } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

import {
  AuthActionTypes,
  LoggedIn,
  LoggedUser,
  LoginUser,
  LogoutAuth,
  LoginUserError,
} from '../Actions/auth.action';

@Injectable({
  providedIn: 'root',
})
export class AuthEffects {
  constructor(
    private actions$: Actions,
    private authService: AuthService,
    private router: Router
  ) {}

  loginUserError$ = createEffect(() => {
    return this.actions$.pipe(
      ofType<LoginUserError>(AuthActionTypes.LoginUserError),
      tap((v) => console.log('LoggedAPI error', v.payload)),
      map((data) => {
        console.log('ERROR', data);
        return { type: 'LOGIN_API_ERROR', payload: data.payload.error };
      })
    );
  });

  LoginUser$ = createEffect(() => {
    return this.actions$.pipe(
      ofType<LoginUser>(AuthActionTypes.LoginUser),
      tap((v) => console.log('LoginUser effect', v)),
      map((action) => action.payload),
      exhaustMap((user: any) => {
        return this.authService.login(user).pipe(
          map((response) => new LoggedUser(response)),
          catchError((error) => of(new LoginUserError(error)))
        );
      })
    );
  });

  LoggedUser$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType<LoggedUser>(AuthActionTypes.LoggedUser),
        tap((v) =>
          this.router.navigate(['/chat'])
        )
      );
    },
    { dispatch: false }
  );
}
