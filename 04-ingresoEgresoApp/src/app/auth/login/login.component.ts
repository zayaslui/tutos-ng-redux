import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
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

  ngOnInit():void{}

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

    this.authService.loginUsuario(email, password)
    .then(credenciales => {
      console.log(credenciales);
      //cancelar el loading
      Swal.close();
      //cancelar el loading

      this.router.navigate(['/'])
    })
    .catch(err => {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: err.message,
        footer: '<a href="">Why do I have this issue?</a>'
      })
    })


    console.log(this.loginForm);
    console.log(this.loginForm.valid);
    console.log(this.loginForm.value);
  }


}
