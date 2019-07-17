import { Injectable } from '@angular/core';

import { User } from './user';

@Injectable({
    providedIn: 'root',
})
export class AuthService {
    currentUser: User | null;
    redirectUrl: string;

    constructor() { }

    isLoggedIn(): boolean {
        return !!this.currentUser;
    }

    login(userName: string, password: string): void {
        this.currentUser = {
            id: 2,
            userName: userName
        };
    }

    logout(): void {
        this.currentUser = null;
    }
}
