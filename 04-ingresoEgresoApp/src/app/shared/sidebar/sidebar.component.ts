import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { filter, Subscription } from 'rxjs';
import { AppState } from 'src/app/app.reducer';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit, OnDestroy{

  username : string = '';
  userSubs : Subscription;

  constructor(private authService : AuthService, private router: Router, private store: Store<AppState> ){
    this.username = '';
    this.userSubs = Subscription.EMPTY;
  }
  ngOnDestroy(): void {
    this.userSubs.unsubscribe();
  }

  logout(){
    this.authService.logout()
      .then( () => {
        this.router.navigate(['/login'])
      })
    
  }
  ngOnInit(): void {
    this.userSubs = this.store.select('user')
      .pipe(
        filter( user => user.user!=null)
      )
      .subscribe( ({user}) => {
        if(user?.nombre)
          this.username = user.nombre;
      })
  }
}
