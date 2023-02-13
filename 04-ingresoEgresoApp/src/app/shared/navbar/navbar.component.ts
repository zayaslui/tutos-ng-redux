import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { filter, Subscription, tap } from 'rxjs';
import { AppState } from 'src/app/app.reducer';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit, OnDestroy{
  
  username : string;
  userSubs : Subscription;

  constructor(private store : Store<AppState>){
    this.username = '';
    this.userSubs = Subscription.EMPTY;

  }

  ngOnDestroy(): void {
    this.userSubs.unsubscribe();
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
