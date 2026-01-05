import { Injectable, signal } from "@angular/core";

@Injectable({
    providedIn: 'root'
})

export class AuthService {
    readonly isLoggedIn$ = localStorage.getItem('isLoggedIn') === 'true';
    readonly userName$ = localStorage.getItem('userName');

    login(email: string) {
        
        localStorage.setItem('isLoggedIn', 'true');
        if (email.includes('abhishek')) {
            localStorage.setItem('userName', 'Abhishek');
        }
    }

    logout() {
        localStorage.removeItem('isLoggedIn');
        localStorage.removeItem('userName');
    }
}