import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { BaseComponent } from '../shared/base.component';
import { LoginService } from '../shared/services/login.service';
import { takeUntil } from 'rxjs';
import { AuthService } from '../shared/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent extends BaseComponent implements OnInit {
  public loginMode = true;
  public loginForm?: FormGroup;
  public registerForm?: FormGroup;
  public FORM_KEYS = {
    NAME: 'name',
    EMAIL: 'email',
    PASSWORD: 'password',
    CONFIRM_PASSWORD: 'confirmPassword',
  };

  constructor(
    private fb: FormBuilder,
    private loginService: LoginService,
    private authService: AuthService,
  ) {
    super();
  }


  ngOnInit(): void {
    this.initLoginForm();
    this.initRegisterForm();
    console.log('r', this);
  }

  test(){
    this.authService.updateToken().subscribe();
  }
test2(){
    this.loginService.getTMPUsers().subscribe();
  }

  public changeMode(b: boolean): void {
    this.loginMode = b;
  }

  public login(): void {
    const v = this.loginForm?.getRawValue();
    this.loginService.login(
      v.email,
      v.password
    ).pipe(
      takeUntil(this.destroy$)
    ).subscribe(resp => {
      console.log(resp);
    }, error => {

    })
  }

  public register(): void {
    const v = this.registerForm?.getRawValue();
    this.loginService.register(
      v[this.FORM_KEYS.EMAIL],
      v[this.FORM_KEYS.NAME],
      v[this.FORM_KEYS.PASSWORD]
    ).pipe(
      takeUntil(this.destroy$)
    ).subscribe(resp => {
      console.log(resp);
    }, error => {

    })
  }

  private initLoginForm(): void {
    this.loginForm = this.fb.group({ //TODO: TMP DEFAULT INP
      [this.FORM_KEYS.EMAIL]: ['max@email.com', [Validators.required, Validators.email]],
      [this.FORM_KEYS.PASSWORD]: ['max', [Validators.required, Validators.minLength(3)]]
    });
  }

  private initRegisterForm(): void {
    this.registerForm = this.fb.group({
      [this.FORM_KEYS.NAME]: ['', [Validators.required, Validators.minLength(2)]],
      [this.FORM_KEYS.EMAIL]: ['', [Validators.required, Validators.email]],
      [this.FORM_KEYS.PASSWORD]: ['', [Validators.required, Validators.minLength(3)]],
      [this.FORM_KEYS.CONFIRM_PASSWORD]: ['', [Validators.required]]
    });
  }

}
