import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  registroForm : FormGroup;

  constructor( 
              private fb          : FormBuilder, 
              private authService : AuthService,
              private router      : Router
            ){

    this.registroForm = new FormGroup('')

  }

  ngOnInit():void{
    this.registroForm = this.fb.group({
      nombre    : ['', Validators.required],
      email     : ['', Validators.required],
      password  : ['', Validators.required]
    })
  }

  crearUsuario(){
    
    if(this.registroForm.invalid){return;}    
    const {nombre, email, password} = this.registroForm.value;
    this.authService.crearUsuario(nombre, email, password)
      .then(credenciales => {
        console.log(credenciales);
        this.router.navigate(['/'])
      })
      .catch(err => console.error(err))
    
    /*
    console.log(this.registroForm);
    console.log(this.registroForm.valid);
    console.log(this.registroForm.value);
    */
  }

}
