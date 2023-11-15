import { Component, OnInit } from '@angular/core';
import { Discussion } from 'src/app/classes/discussion/discussion';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css'],
})
export class MainComponent implements OnInit {
  discussions: Discussion[];
  constructor(private discussionService: DataService) {}
  ngOnInit(): void {
    this.discussionService.getDiscussions().subscribe((data) => {
      this.discussions = data;
    });
  }
}
