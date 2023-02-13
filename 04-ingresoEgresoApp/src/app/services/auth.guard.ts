import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanLoad, Route, Router, RouterStateSnapshot, UrlSegment, UrlTree } from '@angular/router';
import { Observable, take, tap } from 'rxjs';
import { AuthService } from './auth.service';


@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate, CanLoad {

  constructor(private authService : AuthService, private router : Router){

  }
  canLoad(): Observable<boolean>{
    return this.authService.isAuth()
    .pipe(
      tap( estado => {
        //console.log("verificando canActivate...");
        if ( !estado ) { 
          console.log("no hay credenciales redireccionando al login");
          this.router.navigate(['/login']);
        }
      }),
      take(1) //cuando se resuelve se cancela la subscripcion
    );
  }

  canActivate(): Observable<boolean>{
    return this.authService.isAuth()
    .pipe(
      tap( estado => {
        //console.log("verificando canActivate...");
        if ( !estado ) { 
          console.log("no hay credenciales redireccionando al login");
          this.router.navigate(['/login']);
        }
      }),
      take(1)
    );
  }
  
}
