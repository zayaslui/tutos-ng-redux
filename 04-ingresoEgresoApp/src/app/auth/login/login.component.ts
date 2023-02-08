import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { tap } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  loginForm : FormGroup;

  constructor(
    private fb          : FormBuilder, 
    private authService : AuthService,
    private router      : Router
  ){
    this.loginForm = this.fb.group({
      email         : ['', Validators.required],
      password      : ['', Validators.required]
    })
  }

  ngOnInit():void{
    console.log("verificando login")
    this.router.navigate(["/"]);
  }

  login(){
    if(this.loginForm.invalid){return;}
    const {email, password} = this.loginForm.value
    
    //disparar el loading
    Swal.fire({
      title: 'Auto close alert!',
      html: 'I will close in <b></b> milliseconds.',
      didOpen: () => {
        Swal.showLoading()
      }
    })

    //disparar el loading

    //this.authService.loginUsuario(email, password)
    this.authService.loginUsuario('lzayas@gmail.com', '123456')
    .then(credenciales => {
      console.log("credenciales: ", credenciales);
      Swal.close();
      //TODO aca redirecciona al dashboard
      console.log("intentando redireccionar")
      this.router.navigate(['/']).catch(error => {
        console.log("Navigate ERROR", error);
      })
    })
    .catch(err => {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: err.message,
        footer: '<a href="">Why do I have this issue?</a>'
      })
    })
    //mude aca porque dentro del promise no funciona
    this.router.navigate(['/']).catch(error => {
      console.log("Navigate ERROR", error);
    })

    //console.log(this.loginForm);
    //console.log(this.loginForm.valid);
    //console.log(this.loginForm.value);
  }


}
