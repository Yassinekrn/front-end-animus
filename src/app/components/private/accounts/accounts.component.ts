import { Component, OnInit, ViewChild } from '@angular/core';
import { Member } from 'src/app/classes/member/member';
import { DataService } from 'src/app/services/data.service';

import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-accounts',
  templateUrl: './accounts.component.html',
  styleUrls: ['./accounts.component.css'],
})
export class AccountsComponent implements OnInit {
  @ViewChild('deleteConfirmationModal') deleteConfirmationModal: any;
  members: Member[] = [];
  memberIdToDelete: number = -1;
  constructor(
    private dataService: DataService,
    public modalService: NgbModal
  ) {}
  ngOnInit(): void {
    this.dataService.getMembers().subscribe((members) => {
      this.members = members.filter((member) => member.role !== 'admin');
    });
  }

  deleteMember() {
    this.dataService.deleteMember(this.memberIdToDelete).subscribe((data) => {
      this.members = this.members.filter(
        (member) => member.id != this.memberIdToDelete
      );
    });
  }

  setMemberToDelete(id: number) {
    this.memberIdToDelete = id;
  }
}
