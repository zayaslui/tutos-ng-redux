import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {

  constructor(private router: Router){}

  irUsuario(id: string){

    console.log(id)

    if(!id){
      return;
    }
  this.router.navigate(['/usuario',id]);

  }


}
