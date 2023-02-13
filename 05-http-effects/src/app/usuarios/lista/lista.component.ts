import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs';
import { Usuario } from 'src/app/models/usuario.model';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-lista',
  templateUrl: './lista.component.html',
  styleUrls: ['./lista.component.css']
})
export class ListaComponent implements OnInit{

  usuarios: Usuario[] = [];
  
  constructor(public usuarioService: UsuarioService){}

  ngOnInit(): void {
    this.usuarioService.getUsers()
        .pipe(map( (resp:any) => {
          return resp['data'];
        }))
        .subscribe( users => {
          console.log(users);
          this.usuarios = users;
        })
  }



}
