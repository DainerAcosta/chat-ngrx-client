import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Action } from "@ngrx/store";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { catchError, exhaustMap, map, mergeMap, tap } from "rxjs/operators";

import { 
    AuthActionTypes,
    LoggedIn, LoggedUser,
    LoginUser, LogoutAuth,
    LoginUserError
 } from "../Actions/auth.action";

 import { AuthService } from "../Services/auth.service";
import { of } from "rxjs";

 @Injectable({
     providedIn: 'root' 
 })

 export class AuthEffects {

    constructor(
        private http: HttpClient,
        private actions$: Actions,
        private authService: AuthService
    ) {}

    loginUserError$ = createEffect(() => {
        return this.actions$.pipe(
            ofType<LoginUserError>(AuthActionTypes.LoginUserError),
            tap(v => console.log('LoggedAPI error', v.payload)),
            map(data => {
                return {type: 'LOGIN_API_ERROR', payload: 'Email or password incorrect'};
            })
        );
    });

    LoginUser$ = createEffect(() => {
        return this.actions$.pipe(
            ofType<LoginUser>(AuthActionTypes.LoginUser),
            tap(v => console.log('LoginUser effect', v)),
            map(action => action.payload),
            exhaustMap(auth => {
                return this.authService.login(auth.user)
                            .pipe(
                                map(response => new LoggedUser(response)),
                                catchError(error => of(new LoginUserError(error))),
                            )
            })
        );
    });
    
    LoggedUser$ = createEffect(() => {
        return this.actions$.pipe(
            ofType<LoggedUser>(AuthActionTypes.LoggedUser),
            tap(v => console.log('LoggedUser payload', v.payload)),
            map(data => {
                console.log(data);
                return { type: '', payload: data };
            })
        )
    })

 }