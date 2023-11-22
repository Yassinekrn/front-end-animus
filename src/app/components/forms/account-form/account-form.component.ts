import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  ValidationErrors,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { Member } from 'src/app/classes/member/member';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-account-form',
  templateUrl: './account-form.component.html',
  styleUrls: ['./account-form.component.css'],
})
export class AccountFormComponent implements OnInit {
  changePasswordForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private dataService: DataService,
    private router: Router
  ) {}

  ngOnInit() {
    this.changePasswordForm = this.formBuilder.group({
      oldPassword: ['', [Validators.required, Validators.minLength(6)]],
      newPassword: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  onSubmit() {
    if (this.changePasswordForm.invalid) {
      console.log('Invalid form');

      return;
    }
    // check wether the old password is correct
    let UpdatedMember: Member;
    const newPassword = this.changePasswordForm.get('newPassword').value;
    const userId = parseInt(localStorage.getItem('userId'));
    this.dataService.getMember(userId).subscribe((user) => {
      UpdatedMember = user;
      if (user.password !== this.changePasswordForm.get('oldPassword').value) {
        console.log('Old password is incorrect');
        return;
      }
      UpdatedMember.password = newPassword;
      this.dataService.updateMember(UpdatedMember).subscribe((user) => {
        console.log(user);
        this.router.navigate(['/user']);
      });
    });
  }
}
