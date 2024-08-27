import { EmailResponse } from './../../../shared/model/responses/email-response.model';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { RequestLogin } from 'src/app/shared/model/requests/request-login.model';
import { ClienteResponse } from 'src/app/shared/model/responses/cliente-response.model';
import { AuthService } from 'src/app/shared/services/auth.service';
import { EmailService } from 'src/app/shared/services/email.service';
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
  crendeSave: any;
  emailStatus: string;

  constructor(
    private formBuilder: FormBuilder,
    private register: RegisterLoginService,
    private router: Router,
    private authService: AuthService,
    private emailService: EmailService
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

  ngOnInit(): void {
    const credencialesGuardadas = localStorage.getItem('credenciales');

    if (credencialesGuardadas) {
      const credenciales = JSON.parse(credencialesGuardadas); // Convertir el string a objeto

      // Configurar el formulario con las credenciales recuperadas
      this.loginForm = this.formBuilder.group({
        emailUsu: [credenciales.gmail, [Validators.required, Validators.email]],
        passwd: [credenciales.passwd, [Validators.required]],
        agreed: [false],
      });
    }
  }

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
          } else {
            if (localStorage.getItem('credenciales')) {
              localStorage.removeItem('credenciales');
            }
          }
          this.clienteIni = cli;
        },
        error: (err) => {
          console.error(err);
          this.loginError = 'Error al iniciar sesión. Intente de nuevo.';
        },
        complete: () => {
          if (this.clienteIni != null) {

            sessionStorage.setItem('datosUsu', JSON.stringify(this.clienteIni));
            this.router.navigate(['/welcome']);
            this.authService.updateUserData(this.clienteIni);
          } else {
            console.error('Cliente no existe');
            this.loginError = 'Usuario o contraseña incorrectos.'; // Establecer el mensaje de error
          }
        },
      });
    } else {
      console.log('Formulario inválido');
      // Manejar el caso cuando el formulario no es válido
      this.loginForm.markAllAsTouched();
    }
  }

  enviarPasswd() {
    let clientePass: ClienteResponse;
    this.authService
      .getDatosUsuEmail(this.PassForm.value.emailUsuRecPass)
      .subscribe((c) => {
        clientePass = c;
        let correo: EmailResponse = {
          email: this.PassForm.value.emailUsuRecPass,
          body: clientePass.passwd,
        };
        console.info(correo);
        if (this.PassForm.valid) {
          this.emailService.enviarEmail(correo).subscribe({
            next: (mensaje) => {
              this.emailStatus = mensaje;
            },
            error: (err) => {
              console.error(err);
            },
            complete: () => {
              console.info('completado');
            },
          });
        } else {
          console.log('Formulario inválido');
          // Manejar el caso cuando el formulario no es válido
          this.PassForm.markAllAsTouched();
        }
      });
  }
}
