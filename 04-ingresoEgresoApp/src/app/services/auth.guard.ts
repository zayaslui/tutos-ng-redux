import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable, tap } from 'rxjs';
import { AuthService } from './auth.service';


@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private authService : AuthService, private router : Router){

  }

  canActivate(): Observable<boolean>{
      console.log(this.authService.isAuth())
    return this.authService.isAuth()
    /*
    return this.authService.isAuth();
          .pipe(
            tap( estado => {
              console.log("estado: ",estado)
              if(!estado){
                this.router.navigate(['/login'])
              }else{
                this.router.navigate(['/'])
              }
            })
          )
          */
  }
  
}
