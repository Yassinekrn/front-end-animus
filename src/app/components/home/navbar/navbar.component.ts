import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  constructor(private router: Router, private authService: AuthService) {}
  auth: boolean = false;
  role: string = '';
  ngOnInit(): void {
    this.auth = localStorage.getItem('userRole') ? true : false;
    this.role = localStorage.getItem('userRole')
      ? localStorage.getItem('userRole')
      : '';
  }

  LogIn_LogOut() {
    if (this.auth) {
      //user want to logout
      this.authService.logout();
      this.router.navigate(['/login']);
    } else {
      //user want to login
      this.router.navigate(['login']);
    }
  }
}
