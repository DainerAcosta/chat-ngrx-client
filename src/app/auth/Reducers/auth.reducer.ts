import * as AuthActions from '../Actions/auth.action';
import { AuthActionTypes } from '../Actions/auth.action';

export interface State {
  user: Array<any>;
  tokens: Array<any>;
  error: string;
  isLoading: boolean;
}

const initialState: State = {
  user: [],
  tokens: [],
  error: '',
  isLoading: false,
};

export function AuthReducer(state = initialState, action: AuthActions.actions) {
  switch (action.type) {
    case AuthActionTypes.LoginUser:
      console.log('reducer entre en login');
      return {
        ...state,
        isLoading: true,
        action: action,
      };
    case AuthActionTypes.LoggedUser:
      console.log('entre al logged');
      return {
        ...state,
        isLoading: false,
        tokens: action.payload,
      };
    case AuthActionTypes.LoginUserError:
      return {
        ...state,
        isLoading: false,
        error: 'Email or password incorrect',
      };
    default:
      return state;
  }
}

export const getAuthState = (state: State) => state.user;
export const getAuthAction = (action: any) => action.payload;
export const getAuthError = (state: State) => state.error;
export const getAuthLoading = (state: State) => state.isLoading;
