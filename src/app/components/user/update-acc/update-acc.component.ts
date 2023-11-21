import { Component, OnInit } from '@angular/core';
import { Member } from 'src/app/classes/member/member';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-update-acc',
  templateUrl: './update-acc.component.html',
  styleUrls: ['./update-acc.component.css'],
})
export class UpdateAccComponent implements OnInit {
  userId: number;
  user: Member;
  constructor(private dataService: DataService) {}
  ngOnInit(): void {
    this.userId = parseInt(localStorage.getItem('userId'));

    this.dataService.getMember(this.userId).subscribe((user) => {
      if (user) {
        this.user = user;
      }
    });
  }
}
