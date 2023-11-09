import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Discussion } from '../classes/discussion/discussion';

@Injectable({
  providedIn: 'root',
})
export class DiscussionService {
  URL = 'http://localhost:3000/discussions';

  constructor(private http: HttpClient) {}

  getDiscussions(): Observable<Discussion[]> {
    return this.http.get<Discussion[]>(this.URL);
  }

  getDiscussion(id: string): Observable<Discussion> {
    return this.http.get<Discussion>(this.URL + '/' + id);
  }

  addDiscussion(discussion: Discussion): Observable<Discussion> {
    return this.http.post<Discussion>(this.URL, discussion);
  }

  updateDiscussion(discussion: Discussion): Observable<Discussion> {
    return this.http.put<Discussion>(
      this.URL + '/' + discussion.id,
      discussion
    );
  }

  deleteDiscussion(id: string): Observable<Discussion> {
    return this.http.delete<Discussion>(this.URL + '/' + id);
  }
}
