import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable, take, tap } from 'rxjs';
import { AuthService } from './auth.service';


@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private authService : AuthService, private router : Router){

  }

  canActivate(): Observable<boolean>{
    return this.authService.isAuth()
    .pipe(
      tap( estado => {
        console.log("verificando canActivate...");
        if ( !estado ) { 
          console.log("no hay credenciales redireccionando al login");
          this.router.navigate(['/login']);
        }
      }),
      take(1)
    );
  }
  
}
