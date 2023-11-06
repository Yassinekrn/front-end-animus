import { Component } from '@angular/core';

import {
  FormBuilder,
  FormGroup,
  Validators,
  AbstractControl,
  ValidationErrors,
} from '@angular/forms';
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent {
  myForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.myForm = this.fb.group(
      {
        last_name: ['', Validators.required],
        first_name: ['', Validators.required],
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required, Validators.minLength(5)]],
        confirm_password: ['', [Validators.required, Validators.minLength(5)]],
      },
      {
        validator: this.passwordMatchValidator, // Add the custom validator function
      }
    );
  }

  // Custom validator function
  // AbstractControl represents the form control or group that you want to validate. (In this case, the whole form group.)
  passwordMatchValidator(control: AbstractControl): ValidationErrors | null {
    const password = control.get('password');
    const confirm_password = control.get('confirm_password');

    if (password.value !== confirm_password.value) {
      return { passwordMismatch: true };
    }

    return null; // no validation error
  }

  onSubmit() {
    if (this.myForm.valid) {
      // Modify the form value object
      const formData = this.myForm.value;

      // Add new attributes
      formData.role = 'member';
      formData.join_date = new Date(); // Current date and time

      // Now formData contains 'role' and 'join_date' in addition to the form fields
      console.log(formData);

      // Handle the form submission here
    }
  }
}
