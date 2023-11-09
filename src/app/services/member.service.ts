import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Member } from '../classes/member/member';

@Injectable({
  providedIn: 'root',
})
export class MemberService {
  constructor(private http: HttpClient) {}

  URL = 'http://localhost:3000/members';

  getMembers(): Observable<Member[]> {
    return this.http.get<Member[]>(this.URL);
  }

  getMember(id: string): Observable<Member> {
    return this.http.get<Member>(this.URL + '/' + id);
  }

  addMember(member: Member): Observable<Member> {
    return this.http.post<Member>(this.URL, member);
  }

  updateMember(member: Member): Observable<Member> {
    return this.http.put<Member>(this.URL + '/' + member.id, member);
  }

  deleteMember(id: string): Observable<Member> {
    // check if member is used in discussions, if it is, don't delete it
    return this.http.delete<Member>(this.URL + '/' + id);
  }
}
