import { inject } from "@angular/core";
import { CanActivateFn, Router } from "@angular/router";
import { AuthService } from "./auth.service";

export const AuthGuard: CanActivateFn = () => {
    const auth = inject(AuthService);
    const route = inject(Router);
    
    if (auth.isLoggedIn$) {
        return true;
    }
    route.navigate(['login']);
    return false;
}