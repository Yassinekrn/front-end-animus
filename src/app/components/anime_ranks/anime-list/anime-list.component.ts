import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Anime } from 'src/app/classes/anime/anime';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-anime-list',
  templateUrl: './anime-list.component.html',
  styleUrls: ['./anime-list.component.css'],
})
export class AnimeListComponent implements OnInit {
  onAnimeDeleted(deletedAnimeId: number) {
    this.animes = this.animes.filter((anime) => anime.id !== deletedAnimeId);
  }
  animes: Anime[];
  showEditDeleteButton: boolean = false;
  userRole: string = '';
  constructor(private dataService: DataService, private router: Router) {}

  ngOnInit(): void {
    this.userRole = localStorage.getItem('userRole');
    this.showEditDeleteButton = this.userRole === 'admin';
    this.dataService.getAnimes().subscribe((data) => {
      this.animes = data;
    });
  }

  // Function to generate a random ID for MyAnimeList
  getRandomAnimeId(): number {
    // Generate a random number based on the range of available IDs or a different logic
    return Math.floor(Math.random() * 5000) + 1;
  }

  // Function to generate a random query for Novel Updates
  getRandomNovelQuery(): string {
    // Generate a random query or a different logic
    const queries = [
      'fantasy',
      'romance',
      'action',
      'adventure',
      'comedy',
      'Supernatural',
      'Shounen',
    ];
    const randomIndex = Math.floor(Math.random() * queries.length);
    return queries[randomIndex];
  }

  // Click event handler for the button
  redirectToRandomAnime(): void {
    const randomAnimeId = this.getRandomAnimeId();
    window.open(`https://myanimelist.net/anime/${randomAnimeId}`);
  }

  redirectToRandomNovel(): void {
    const randomNovelQuery = this.getRandomNovelQuery();
    window.open(`https://www.novelupdates.com/?s=${randomNovelQuery}`);
  }

  randomAnime() {
    const randomIndex = Math.floor(Math.random() * 3);
    if (randomIndex == 3) {
      this.redirectToRandomNovel();
    } else {
      this.redirectToRandomAnime();
    }
  }
}
