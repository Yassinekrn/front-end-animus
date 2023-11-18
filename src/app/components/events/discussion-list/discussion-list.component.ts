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
  filteredDiscussions: Discussion[]; // Add a new array for filtered discussions
  showJoinLeaveButton: boolean = false;
  showEditDeleteButton: boolean = false;
  searchTerm: string = ''; // Track the search term

  constructor(private dataService: DataService) {}

  ngOnInit() {
    const userRole = localStorage.getItem('userRole');
    this.showJoinLeaveButton = userRole === 'member' || userRole === 'admin';
    this.showEditDeleteButton = userRole === 'admin';

    this.dataService.getDiscussions().subscribe((data) => {
      this.discussions = data;
      this.filteredDiscussions = [...data]; // Initialize filtered discussions with all discussions
    });
  }

  // Function to filter discussions based on the search term
  filterDiscussions() {
    this.filteredDiscussions = this.discussions.filter((discussion) =>
      discussion.title.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }

  // Function to handle the search button click
  searchDiscussions() {
    this.filterDiscussions();
  }
}
