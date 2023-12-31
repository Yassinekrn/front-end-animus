import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { Discussion } from 'src/app/classes/discussion/discussion';
import { DataService } from 'src/app/services/data.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-discussion',
  templateUrl: './discussion.component.html',
  styleUrls: ['./discussion.component.css'],
})
export class DiscussionComponent implements OnInit {
  @Input('discussion') discussion: Discussion;
  showJoinLeaveButton: boolean = false;
  showEditDeleteButton: boolean = false;
  Joined: boolean = false;
  userId: string; // Assuming you have userId available in your component
  deleteDiscussionId: number;
  @Output() discussionDeleted: EventEmitter<number> =
    new EventEmitter<number>();

  constructor(private dataService: DataService, private router: Router) {}

  ngOnInit() {
    const userRole = localStorage.getItem('userRole');
    this.showJoinLeaveButton = userRole === 'member' || userRole === 'admin';
    this.showEditDeleteButton = userRole === 'admin';
    this.userId = localStorage.getItem('userId');
    this.userInDiscussion();
    this.deleteDiscussionId = this.discussion.id;
  }

  alertId(id: number) {
    this.deleteDiscussionId = id;
    console.log('Discussion id: ' + this.deleteDiscussionId);
  }

  userInDiscussion() {
    this.dataService
      .isUserInDiscussion(this.userId, this.discussion.id)
      .subscribe((data) => {
        this.Joined = data;
      });
  }

  joinLeaveDiscussion() {
    if (this.Joined) {
      this.dataService
        .removeUserFromDiscussion(this.userId, this.discussion.id)
        .subscribe((data) => {
          console.log('User removed from discussion successfully\n' + data);
          this.Joined = false;
        });
    } else {
      this.dataService
        .addUserToDiscussion(this.userId, this.discussion.id)
        .subscribe((data) => {
          console.log('User added to discussion successfully\n' + data);
          this.Joined = true;
        });
    }
  }

  deleteDiscussion(id: number) {
    this.dataService.deleteDiscussion(id).subscribe((data) => {
      console.log('Discussion deleted successfully\n' + data);
      this.discussionDeleted.emit(id); // Emit an event with the deleted discussion ID
    });
  }

  updateDiscussion(discussionID: number) {
    // Navigate to the 'update' route and pass the discussion ID as a parameter
    this.router.navigate(['/update_disc', discussionID]);
  }
}
