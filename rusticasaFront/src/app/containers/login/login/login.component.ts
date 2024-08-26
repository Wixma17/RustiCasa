import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;

  constructor(private formBuilder: FormBuilder) {
    this.loginForm = this.formBuilder.group({
      emailUsu: ['', [Validators.required, Validators.email]],
      passwd: ['', [Validators.required]],
      agreed: [false]
    });
  }

  ngOnInit(): void {}

  loginUsu(): void {
    if (this.loginForm.valid) {
      console.log('Formulario válido', this.loginForm.value);
      // Manejar el login aquí
    } else {
      console.log('Formulario inválido');
      // Manejar el caso cuando el formulario no es válido
      this.loginForm.markAllAsTouched();
    }
  }
}
