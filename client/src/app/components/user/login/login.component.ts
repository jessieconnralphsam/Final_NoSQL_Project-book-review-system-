// Decorators and Lifehooks
import { Component, OnInit } from '@angular/core';

// Forms
import { FormControl, FormGroup, Validators, AbstractControl } from '@angular/forms';

// Router
import { Router } from '@angular/router';

// Services
import { UserService } from '../../../core/services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
//class
export class LoginComponent implements OnInit {
  loginForm: FormGroup;

  constructor(
    private userService: UserService,
    private router: Router
  ) { }
  //initialize
  ngOnInit(): void {
    this.loginForm = new FormGroup({
      'username': new FormControl('', [
        Validators.required
      ]),
      'password': new FormControl('', [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(16)
      ]),
    });
  }
  //method submit form
  onSubmit(): void {
    this.userService
      .login(this.loginForm.value)
      .subscribe(() => {
        this.router.navigate(['/home']);
      });
  }
  //getter methods password og username
  get username(): AbstractControl {
    return this.loginForm.get('username');
  }

  get password(): AbstractControl {
    return this.loginForm.get('password');
  }

}
