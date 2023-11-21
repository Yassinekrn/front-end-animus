import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  ValidationErrors,
  Validators,
} from '@angular/forms';
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
    private dataService: DataService
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
    let UpdatedMember: Member;
    const newPassword = this.changePasswordForm.get('newPassword').value;
    const userId = parseInt(localStorage.getItem('userId'));
    this.dataService.getMember(userId).subscribe((user) => {
      UpdatedMember = user;
      UpdatedMember.password = newPassword;

      this.dataService.updateMember(UpdatedMember).subscribe((user) => {
        console.log(user);
      });
    });
  }
}
