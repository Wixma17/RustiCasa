import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { RequestLogin } from 'src/app/shared/model/requests/request-login.model';
import { AuthService } from 'src/app/shared/services/auth.service';
import { RegisterLoginService } from 'src/app/shared/services/register-login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  PassForm: FormGroup;
  clienteIni: any;
  loginError: string | null = null; // Nueva propiedad para manejar el error

  constructor(
    private formBuilder: FormBuilder,
    private register: RegisterLoginService,
    private router: Router,
    private authService: AuthService
  ) {
    this.loginForm = this.formBuilder.group({
      emailUsu: ['', [Validators.required, Validators.email]],
      passwd: ['', [Validators.required]],
      agreed: [false],
    });

    this.PassForm = this.formBuilder.group({
      emailUsuRecPass: ['', [Validators.required, Validators.email]],
    });
  }

  ngOnInit(): void {}

  loginUsu(): void {
    if (this.loginForm.valid) {
      let cliente: RequestLogin = {
        gmail: this.loginForm.value.emailUsu,
        passwd: this.loginForm.value.passwd,
      };

      this.register.login(cliente).subscribe({
        next: (cli) => {
          if (this.loginForm.value.agreed) {
            localStorage.setItem('credenciales', JSON.stringify(cliente));
          }
          this.clienteIni = cli;
        },
        error: (err) => {
          console.error(err);
          this.loginError = 'Error al iniciar sesión. Intente de nuevo.';
        },
        complete: () => {
          if (this.clienteIni != null) {
            console.info("Inicio de sesión correcto=> " + cliente);
            sessionStorage.setItem("datosUsu", JSON.stringify(this.clienteIni));
            this.router.navigate(['/welcome']);
            this.authService.updateUserData(this.clienteIni);
          } else {
            console.error("Cliente no existe");
            this.loginError = 'Usuario o contraseña incorrectos.'; // Establecer el mensaje de error
          }
        }
      });

    } else {
      console.log('Formulario inválido');
      // Manejar el caso cuando el formulario no es válido
      this.loginForm.markAllAsTouched();
    }
  }
}
