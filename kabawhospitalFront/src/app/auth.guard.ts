// src/app/auth.guard.ts
import { Injectable, inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable({ providedIn: 'root' })
export class AuthGuard {
  // Remove implements CanActivate if you have it

  constructor(
    private router: Router,
    private authService: AuthService
  ) {}

  canActivate(): boolean {
    const currentUser = this.authService.currentUserValue;
    if (currentUser) {
      return true;
    } else {
      this.router.navigate(['/login']);
      return false;
    }
  }
}