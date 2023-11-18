import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-hero',
  templateUrl: './hero.component.html',
  styleUrls: ['./hero.component.css'],
})
export class HeroComponent implements OnInit {
  members_num: number = 0;
  constructor(private dataService: DataService) {}
  ngOnInit(): void {
    this.dataService.getMembers().subscribe((members) => {
      this.members_num = members.length;
    });
  }
}
