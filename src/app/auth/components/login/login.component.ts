import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { IUser } from 'src/app/interfaces/IUser';

import { Store } from '@ngrx/store';
import * as Auth from '../../Actions/auth.action';
import * as fromAuth from '../../../reducers/reducers';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  user: IUser;
  form: FormGroup;

  user$ = this.store.select((state) => state.auth.user);
  error$ = this.store.select((state) => state.auth.error);
  isLoading$ = this.store.select((state) => state.auth.isLoading);

  constructor(
    private store: Store<fromAuth.State>,
    private formBuilder: FormBuilder,  
  ) {
    this.buildForm();
  }

  ngOnInit(): void {
    this.user$.subscribe(console.log);
    console.log(this.form.value);
  }

  login() {
    this.user = this.form.value;
    this.store.dispatch(new Auth.LoginUser({ user: this.user }));
  }

  private buildForm() {
    this.form = this.formBuilder.group({
      username: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', Validators.required]
    });
  }
}
