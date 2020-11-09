import {Component, OnInit} from '@angular/core';
import {NgForm} from '@angular/forms';
import {AuthService} from './auth.service';
import {Observable} from 'rxjs';
import {AuthResponseModel} from './auth-response-model';
import {Router} from '@angular/router';
import {Store} from '@ngrx/store';
import * as fromAppReducer from '../store/app.reducer';
import * as AuthActions from './store/auth.actions';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html'
})
export class AuthComponent implements OnInit {
  isLoginMode = true;
  isLoading = false;
  error: string = null;

  constructor(private authService: AuthService,
              private router: Router,
              private store: Store<fromAppReducer.AppState>) {
  }

  ngOnInit(): void {
    this.store.select('auth').subscribe(authState => {
      this.isLoading = authState.loading;
      this.error = authState.authError;
    });
  }

  onSwitchMode() {
    this.isLoginMode = !this.isLoginMode;
  }

  onSubmit(authForm: NgForm) {
    if (!authForm.valid) {
      return;
    }
    const email = authForm.value.email;
    const password = authForm.value.password;
    let authObservable: Observable<AuthResponseModel>;

    this.isLoading = true;
    if (this.isLoginMode) {
      // authObservable = this.authService.login(email, password);
      this.store.dispatch(new AuthActions.LoginStartAction({email: email, password: password}));
    } else {
      authObservable = this.authService.signUp(email, password);
    }

    // authObservable.subscribe(
    //   authResponse => {
    //     console.log(authResponse);
    //     this.isLoading = false;
    //     this.router.navigate(['/recipes']);
    //   },
    //   errorMessage => {
    //     this.error = errorMessage;
    //     this.isLoading = false;
    //   }
    // );

    authForm.reset();
  }

  onHandleError() {
    this.error = null;
  }
}
