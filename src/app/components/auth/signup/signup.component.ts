import { Component } from '@angular/core';

import {
  FormBuilder,
  FormGroup,
  Validators,
  AbstractControl,
  ValidationErrors,
} from '@angular/forms';
import { Router } from '@angular/router';
import { Member } from 'src/app/classes/member/member';
import { DataService } from 'src/app/services/data.service';
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent {
  myForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private dataService: DataService,
    private router: Router
  ) {
    this.myForm = this.fb.group(
      {
        last_name: ['', Validators.required],
        first_name: ['', Validators.required],
        email: ['', [Validators.required, Validators.email]],
        username: ['', [Validators.required, Validators.minLength(5)]],
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
      // remove the confirm_password attribute
      delete formData.confirm_password;

      // Now formData contains 'role' and 'join_date' in addition to the form fields

      this.dataService.addMember(formData).subscribe((data) => {
        console.log(data);
        this.router.navigate(['/login']);
      });
    }
  }
}
