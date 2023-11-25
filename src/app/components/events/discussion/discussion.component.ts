import { Component, Input, OnInit } from '@angular/core';
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

  constructor(private dataService: DataService, private router: Router) {}

  ngOnInit() {
    const userRole = localStorage.getItem('userRole');
    this.showJoinLeaveButton = userRole === 'member' || userRole === 'admin';
    this.showEditDeleteButton = userRole === 'admin';
    this.userId = localStorage.getItem('userId');
    this.userInDiscussion();
  }

  userInDiscussion() {
    // TODO: Call a service method to check if the user is in the discussion
    // This is a placeholder, you should replace it with your actual service method
    this.Joined = this.dataService.isUserInDiscussion(
      this.userId,
      this.discussion.id
    );
  }

  joinLeaveDiscussion() {}

  deleteDiscussion(id: number) {
    this.dataService.deleteDiscussion(id).subscribe((data) => {
      console.log('Discussion deleted successfully\n' + data);
    });
  }

  updateDiscussion(discussionID: number) {
    // Navigate to the 'update' route and pass the discussion ID as a parameter
    this.router.navigate(['/update_disc', discussionID]);
  }
}
