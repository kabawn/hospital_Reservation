// src/app/auth.service.ts
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private currentUserSubject: BehaviorSubject<any>;
  public currentUser: Observable<any>;

  private backendUrl = 'http://localhost:5000'; // Ensure this is the correct URL

  constructor(private http: HttpClient) {
    this.currentUserSubject = new BehaviorSubject<any>(
      JSON.parse(localStorage.getItem('currentUser') || 'null')
    );
        this.currentUser = this.currentUserSubject.asObservable();
  }

  public getJwtToken(): string {
    const currentUser = this.currentUserValue;
    return currentUser?.token;
  }

  public get currentUserValue(): any {
    return this.currentUserSubject.value;
  }

  login(username: string, password: string) {
    return this.http.post<any>(`${this.backendUrl}/admin/login`, { username, password })
      .pipe(map(user => {
        // If a token is received, store the user details and jwt token in local storage
        if (user && user.token) {
          localStorage.setItem('currentUser', JSON.stringify(user));
          this.currentUserSubject.next(user);
        }
        return user;
      }));
  }

  logout() {
    // Remove user from local storage and set the current user to null
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
  }
}
