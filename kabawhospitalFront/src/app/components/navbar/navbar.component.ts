// navbar.component.ts
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from '..//../auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit, OnDestroy {
  isLoggedIn = false;
  username: string | null = null;
  private authSubscription: Subscription | null = null;

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.authSubscription = this.authService.currentUser.subscribe(user => {
      this.isLoggedIn = !!user && !!user.token;
      this.username = user ? user.username : null;
    });
  }

  ngOnDestroy(): void {
    // Unsubscribe to avoid memory leaks
    if (this.authSubscription) {
      this.authSubscription.unsubscribe();
    }
  }

  navigateToLogin(): void {
    this.router.navigate(['/login']);
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
