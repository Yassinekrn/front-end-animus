import { Injectable } from '@angular/core';
import { DataService } from './data.service';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private dataService: DataService, private router: Router) {}

  login(username: string, password: string): Observable<boolean> {
    return this.dataService.getMembers().pipe(
      map((members) => {
        const member = members.find(
          (m) => m.username === username && m.password === password
        );
        if (member) {
          localStorage.setItem('userRole', member.role);
          localStorage.setItem('userId', String(member.id));
          return true;
        } else {
          return false;
        }
      })
    );
  }

  logout() {
    localStorage.removeItem('userRole');
    localStorage.removeItem('userId');
    //TODO: redirect to login page
    // this.router.navigate(['/login']);
  }

  isLoggedIn() {
    return localStorage.getItem('userRole') !== null;
  }
}
