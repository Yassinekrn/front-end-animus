import { Component, OnInit } from '@angular/core';
import { Discussion } from 'src/app/classes/discussion/discussion';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-discussion-list',
  templateUrl: './discussion-list.component.html',
  styleUrls: ['./discussion-list.component.css'],
})
export class DiscussionListComponent implements OnInit {
  discussions: Discussion[];
  showJoinLeaveButton: boolean = false;
  showEditDeleteButton: boolean = false;

  constructor(private dataService: DataService) {}
  ngOnInit() {
    const userRole = localStorage.getItem('userRole');
    this.showJoinLeaveButton = userRole === 'member' || userRole === 'admin';
    this.showEditDeleteButton = userRole === 'admin';

    this.dataService.getDiscussions().subscribe((data) => {
      this.discussions = data;
    });
  }
}
