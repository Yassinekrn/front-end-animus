import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Discussion } from 'src/app/classes/discussion/discussion';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-discussion-list',
  templateUrl: './discussion-list.component.html',
  styleUrls: ['./discussion-list.component.css'],
})
export class DiscussionListComponent implements OnInit {
  discussions: Discussion[];
  filteredDiscussions: Discussion[]; // Add a new array for filtered discussions
  showJoinLeaveButton: boolean = false;
  showEditDeleteButton: boolean = false;
  searchTerm: string = ''; // Track the search term
  spoiler: boolean = true; // so that it is not checked by default
  userRole: string = '';
  constructor(private dataService: DataService, private router: Router) {}

  ngOnInit() {
    this.userRole = localStorage.getItem('userRole');
    this.showJoinLeaveButton =
      this.userRole === 'member' || this.userRole === 'admin';
    this.showEditDeleteButton = this.userRole === 'admin';

    this.dataService.getDiscussions().subscribe((data) => {
      this.discussions = data;
      this.filteredDiscussions = [...data]; // Initialize filtered discussions with all discussions
    });
  }

  // Function to filter discussions based on the search term
  filterDiscussions() {
    this.filteredDiscussions = this.discussions.filter(
      (discussion) =>
        (discussion.title
          .toLowerCase()
          .includes(this.searchTerm.toLowerCase()) &&
          discussion.spoiler === this.spoiler) ||
        discussion.spoiler === false
    );
  }

  // Function to handle the search button click
  searchDiscussions() {
    this.filterDiscussions();
  }
}
