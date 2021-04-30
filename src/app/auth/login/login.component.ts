import { Component, OnInit } from "@angular/core";
import { IUser } from "src/app/interfaces/IUser";

import { Store } from "@ngrx/store";
import * as Auth from "../Actions/auth.action";
import * as fromAuth from "../../reducers/reducers";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  user: IUser;

  user$ = this.store.select(state => state.auth.user);
  error$ = this.store.select(state => state.auth.error);
  isLoading$ = this.store.select(state => state.auth.isLoading);

  constructor(
    private store: Store<fromAuth.State>,
  ) {}

  ngOnInit(): void {
    this.user = {
      username: 'daineracosta',
      email: 'daine@co.com',
      password: '123456'
    }
    this.user$.subscribe(console.log);
  }

  login() {
    this.store.dispatch(new Auth.LoginUser({ user: this.user }));
  }

}
