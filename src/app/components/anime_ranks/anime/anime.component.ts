import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { Anime } from 'src/app/classes/anime/anime';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-anime',
  templateUrl: './anime.component.html',
  styleUrls: ['./anime.component.css'],
})
export class AnimeComponent implements OnInit {
  @Input('anime') anime: Anime;
  showEditDeleteButton: boolean = false;
  Joined: boolean = false;
  userId: string; // Assuming you have userId available in your component
  deletedAnimeId: number;
  @Output() animeDeleted: EventEmitter<number> = new EventEmitter<number>();

  constructor(private dataService: DataService, private router: Router) {}

  ngOnInit(): void {
    const userRole = localStorage.getItem('userRole');
    this.showEditDeleteButton = userRole === 'admin';
    this.userId = localStorage.getItem('userId');
    this.deletedAnimeId = this.anime.id;
  }

  deleteAnime(id: number) {
    this.dataService.deleteAnime(id).subscribe((data) => {
      console.log('Anime deleted successfully\n' + data);
      this.animeDeleted.emit(id); // Emit an event with the deleted Anime ID
    });
  }

  alertId(id: number) {
    this.deletedAnimeId = id;
    console.log('Anime id: ' + this.deletedAnimeId);
  }
}
