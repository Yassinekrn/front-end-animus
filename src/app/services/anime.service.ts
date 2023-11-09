import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Anime } from '../classes/anime/anime';
import { DiscussionService } from './discussion.service';

@Injectable({
  providedIn: 'root',
})
export class AnimeService {
  constructor(
    private http: HttpClient,
    private discussionService: DiscussionService
  ) {}
  URL = 'http://localhost:3000/animes';

  getAnimes(): Observable<Anime[]> {
    return this.http.get<Anime[]>(this.URL);
  }

  getAnime(id: string): Observable<Anime> {
    return this.http.get<Anime>(this.URL + '/' + id);
  }

  addAnime(anime: Anime): Observable<Anime> {
    return this.http.post<Anime>(this.URL, anime);
  }

  updateAnime(anime: Anime): Observable<Anime> {
    return this.http.put<Anime>(this.URL + '/' + anime.id, anime);
  }

  deleteAnime(id: number): Observable<Anime> {
    // check if anime is used in discussions, if it is, don't delete it
    this.discussionService.getDiscussions().subscribe((discussions) => {
      discussions.forEach((discussion) => {
        if (discussion.animes.includes(id)) {
          return;
        }
      });
    });
    return this.http.delete<Anime>(this.URL + '/' + id);
  }
}
