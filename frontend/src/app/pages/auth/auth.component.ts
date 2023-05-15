import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css'],
})
export class AuthComponent {
  loginForm!: FormGroup;
  isLoginPage: boolean = true;
  submitting: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private userService: AuthService
  ) {}

  ngOnInit() {
    this.isLoginPage = this.route.snapshot.routeConfig?.path === 'login';

    this.loginForm = this.formBuilder.group({
      email: [
        '',
        [
          Validators.required,
          Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$'),
        ],
      ],
      password: ['', Validators.required],
    });
  }

  onSubmit() {
    if (this.loginForm.invalid) {
      return;
    }

    this.submitting = true;
    const payload = this.loginForm.value;

    this.userService.authInUser(payload, this.isLoginPage).add(() => {
      this.submitting = false;
    });
  }
}
