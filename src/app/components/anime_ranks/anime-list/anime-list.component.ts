import { Component } from '@angular/core';

@Component({
  selector: 'app-anime-list',
  templateUrl: './anime-list.component.html',
  styleUrls: ['./anime-list.component.css'],
})
export class AnimeListComponent {
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
