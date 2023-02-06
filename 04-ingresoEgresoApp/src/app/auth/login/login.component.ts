import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

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

    this.authService.loginUsuario(email, password)
    .then(credenciales => {
      console.log(credenciales);
      this.router.navigate(['/'])
    })
    .catch(err => console.error(err))


    console.log(this.loginForm);
    console.log(this.loginForm.valid);
    console.log(this.loginForm.value);
  }


}
