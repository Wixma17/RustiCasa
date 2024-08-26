import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private userDataSubject = new BehaviorSubject<any>(null);
  userData$ = this.userDataSubject.asObservable();

  constructor() {
    const storedUserData = JSON.parse(sessionStorage.getItem('datosUsu')!);
    if (storedUserData) {
      this.userDataSubject.next(storedUserData);
    }
  }

  updateUserData(data: any) {
    sessionStorage.setItem('datosUsu', JSON.stringify(data));
    this.userDataSubject.next(data);
  }

  clearUserData() {
    sessionStorage.removeItem('datosUsu');
    this.userDataSubject.next(null);
  }
}
