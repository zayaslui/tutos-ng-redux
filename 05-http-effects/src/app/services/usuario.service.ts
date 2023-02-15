import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  private url:string = 'https://reqres.in/api';

  constructor( private http: HttpClient ) {}

  getUsers() : Observable<any>{
    return this.http.get(`${this.url}/users?delay=1`);
  }

  getUserById(id : string){
    return this.http.get(`${this.url}/users/${ id }`)
               .pipe(
                  map( (resp:any) => {
                      return resp['data']
                  })
               )
  }
  
}
