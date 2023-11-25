import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { Anime } from '../classes/anime/anime';
import { Member } from '../classes/member/member';
import { Discussion } from '../classes/discussion/discussion';
import { forkJoin } from 'rxjs';
import { map, switchMap, catchError } from 'rxjs/operators'; // Add this import statement

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

  /* deleteMemberFromDiscussion(id_member: number): Observable<any> {
    return this.getDiscussions().pipe(
      switchMap((discussions) => {
        const updateObservables = discussions
          .filter((discussion) =>
            discussion.participants.some((p) => p.id === id_member)
          )
          .map((discussion) => {
            const updatedDiscussion = { ...discussion };
            updatedDiscussion.participants =
              updatedDiscussion.participants.filter(
                (participant) => participant.id !== id_member
              );
            return this.updateDiscussion(updatedDiscussion);
          });

        return forkJoin(updateObservables);
      })
    );
  }

  deleteMember(id: number): Observable<Member> {
    return forkJoin([
      this.deleteMemberFromDiscussion(id),
      this.http.delete<Member>(`${this.memberUrl}/${id}`),
    ]).pipe(
      map(([discussionsUpdateResponse, memberDeleteResponse]) => {
        // Assuming you need to return something after both operations are complete
        console.log('Member and discussions deleted successfully');
        return memberDeleteResponse;
      })
    );
  } */
  deleteMemberFromDiscussion(id_member: number): Observable<boolean> {
    return this.getDiscussions().pipe(
      switchMap((discussions) => {
        const discussionsToDelete = discussions.filter((discussion) =>
          discussion.participants.some((p) => p.id === id_member)
        );

        if (discussionsToDelete.length === 0) {
          return of(true); // No discussions to delete
        }

        const deleteDiscussion = (index: number): Observable<boolean> => {
          if (index === discussionsToDelete.length) {
            return of(true); // All discussions deleted
          }

          const discussion = discussionsToDelete[index];
          const updatedDiscussion = { ...discussion };
          updatedDiscussion.participants =
            updatedDiscussion.participants.filter(
              (participant) => participant.id !== id_member
            );

          return this.updateDiscussion(updatedDiscussion).pipe(
            switchMap(() => deleteDiscussion(index + 1)),
            catchError(() =>
              throwError(new Error('Failed to delete member from discussion'))
            )
          );
        };

        return deleteDiscussion(0);
      }),
      catchError((error) => {
        console.error('Error in deleteMemberFromDiscussion:', error);
        return throwError(
          () => new Error('Failed to delete member from discussion')
        );
      })
    );
  }

  deleteMember(id: number): Observable<Member> {
    return this.deleteMemberFromDiscussion(id).pipe(
      switchMap((data) => {
        console.log('Member removed from discussions successfully\n' + data);
        return this.http.delete<Member>(`${this.memberUrl}/${id}`);
      })
    );
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

  isUserInDiscussion(
    userId: string,
    discussionId: number
  ): Observable<boolean> {
    return this.getDiscussion(discussionId).pipe(
      map((discussion) =>
        discussion.participants.some((p) => p.id === parseInt(userId))
      )
    );
  }

  // "id": 5,
  //         "username": "olivia_b",
  //         "password": "oliviapass90",
  //         "last_name": "Brown",
  //         "first_name": "Olivia",
  //         "email": "olivia.brown@protonmail.com",
  //         "role": "member",
  //         "join_date": "2023-02-28T14:05:45.567Z"

  addUserToDiscussion(
    userId: string,
    discussionId: number
  ): Observable<boolean> {
    this.getDiscussion(discussionId).subscribe((discussion) => {
      let updatedDiscussion = { ...discussion };
      this.getMember(parseInt(userId)).subscribe((member) => {
        updatedDiscussion.participants.push(member);
        return this.updateDiscussion(updatedDiscussion).subscribe((data) => {
          console.log('User added to discussion successfully\n' + data);
        });
      });
    });
    return of(false);
  }

  removeUserFromDiscussion(
    userId: string,
    discussionId: number
  ): Observable<boolean> {
    this.getDiscussion(discussionId).subscribe((discussion) => {
      let updatedDiscussion = { ...discussion };
      updatedDiscussion.participants = updatedDiscussion.participants.filter(
        (participant) => participant.id !== parseInt(userId)
      );
      return this.updateDiscussion(updatedDiscussion).subscribe((data) => {
        console.log('User removed from discussion successfully\n' + data);
      });
    });
    return of(false);
  }
}
