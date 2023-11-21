import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Anime } from '../classes/anime/anime';
import { Member } from '../classes/member/member';
import { Discussion } from '../classes/discussion/discussion';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  private animeUrl = 'http://localhost:3000/animes';
  private memberUrl = 'http://localhost:3000/members';
  private discussionUrl = 'http://localhost:3000/discussions';

  constructor(private http: HttpClient) {}

  // Anime-related functions
  getAnimes(): Observable<Anime[]> {
    return this.http.get<Anime[]>(this.animeUrl);
  }

  getAnime(id: number): Observable<Anime> {
    return this.http.get<Anime>(`${this.animeUrl}/${id}`);
  }

  addAnime(anime: Anime): Observable<Anime> {
    return this.http.post<Anime>(this.animeUrl, anime);
  }

  updateAnime(anime: Anime): Observable<Anime> {
    return this.http.put<Anime>(`${this.animeUrl}/${anime.id}`, anime);
  }

  deleteAnime(id: number): Observable<Anime> {
    return this.http.delete<Anime>(`${this.animeUrl}/${id}`);
  }

  //Alternate :
  /*
  deleteAnime(id: number): Observable<Anime> {
  // Check if the anime is used in any discussion
  return this.getDiscussions().pipe(
    switchMap((discussions: Discussion[]) => {
      const usedInDiscussion = discussions.some((discussion: Discussion) =>
        discussion.animes.some(animeId => animeId === id)
      );

      if (usedInDiscussion) {
        // Anime is used in a discussion, cannot delete
        return throwError('Cannot delete: Anime is in use in a discussion.');
      } else {
        // Anime is not used in any discussion, proceed with deletion
        return this.http.delete<Anime>(`${this.animeUrl}/${id}`);
      }
    })
  );
}
*/

  // Member-related functions
  getMembers(): Observable<Member[]> {
    return this.http.get<Member[]>(this.memberUrl);
  }

  getMember(id: number): Observable<Member> {
    return this.http.get<Member>(`${this.memberUrl}/${id}`);
  }

  addMember(member: Member): Observable<Member> {
    return this.http.post<Member>(this.memberUrl, member);
  }

  updateMember(member: Member): Observable<Member> {
    return this.http.put<Member>(`${this.memberUrl}/${member.id}`, member);
    // the update works only on the password so I don't need to update on cascade
  }

  deleteMember(id: number): Observable<Member> {
    return this.http.delete<Member>(`${this.memberUrl}/${id}`);
  }
  //TODO: look for way to delete member on cascade

  // Discussion-related functions
  getDiscussions(): Observable<Discussion[]> {
    return this.http.get<Discussion[]>(this.discussionUrl);
  }

  getDiscussion(id: number): Observable<Discussion> {
    return this.http.get<Discussion>(`${this.discussionUrl}/${id}`);
  }

  addDiscussion(discussion: Discussion): Observable<Discussion> {
    return this.http.post<Discussion>(this.discussionUrl, discussion);
  }

  updateDiscussion(discussion: Discussion): Observable<Discussion> {
    return this.http.put<Discussion>(
      `${this.discussionUrl}/${discussion.id}`,
      discussion
    );
  }

  deleteDiscussion(id: number): Observable<Discussion> {
    return this.http.delete<Discussion>(`${this.discussionUrl}/${id}`);
  }

  isUserInDiscussion(userId: string, discussionId: number): boolean {
    //TODO: implement this method
    return true;
  }
}
