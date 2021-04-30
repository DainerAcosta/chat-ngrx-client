import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { LoginComponent } from './login/login.component';
import { FormsModule } from "@angular/forms";
import { MaterialModule } from "../material/material.module";

import { StoreModule } from "@ngrx/store";
import { EffectsModule } from "@ngrx/effects";
import { AuthEffects } from "./Effects/auth.effects";
import * as fromAuth from "./Reducers/auth.reducer";


@NgModule({
  declarations: [
    LoginComponent
  ],
  imports: [
    CommonModule,
    AuthRoutingModule,
    FormsModule,
    MaterialModule,
    //StoreModule.forFeature('auth', fromAuth.AuthReducer),
    EffectsModule.forFeature([AuthEffects]),
  ]
})
export class AuthModule { }
