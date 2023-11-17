import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Discussion } from 'src/app/classes/discussion/discussion';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-discussion-info',
  templateUrl: './discussion-info.component.html',
  styleUrls: ['./discussion-info.component.css'],
})
export class DiscussionInfoComponent implements OnInit {
  discussionId: string;
  discussion: Discussion;
  constructor(
    private activatedRoute: ActivatedRoute,
    private dataService: DataService
  ) {}
  ngOnInit(): void {
    this.discussionId = this.activatedRoute.snapshot.params['id'];
    this.dataService
      .getDiscussion(Number(this.discussionId))
      .subscribe((data) => {
        this.discussion = data;
      });
  }
}
