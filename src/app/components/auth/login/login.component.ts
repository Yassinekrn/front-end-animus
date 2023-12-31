import { Component } from '@angular/core';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  // Define the form group and other necessary variables
  loginForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    // Initialize the form with default values and validations
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  // Function to handle the login process
  login() {
    // Check if the form is valid
    if (this.loginForm.valid) {
      // Get the values from the form
      const username = this.loginForm.value.username;
      const password = this.loginForm.value.password;

      // Add your authentication logic here, e.g., sending a request to a server
      // For now, let's just log the values to the console
      console.log('Username:', username);
      console.log('Password:', password);

      this.authService.login(username, password).subscribe((success) => {
        if (success) {
          this.router.navigate(['/home/discussions']);
        } else {
          this.loginForm.reset();
        }
      });

      // You can also navigate to another page or perform any other action after successful login
    }
  }
}
