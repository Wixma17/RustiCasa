import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  AbstractControl,
  AsyncValidatorFn,
} from '@angular/forms';
import { ClienteService } from 'src/app/shared/services/cliente.service';
import { Observable, of } from 'rxjs';
import { map, catchError, debounceTime, switchMap } from 'rxjs/operators';
import { RequestCliente } from 'src/app/shared/model/requests/request-register.model';
import { AuthService } from 'src/app/shared/services/auth.service';
import { SubidaImagenRequest } from 'src/app/shared/model/requests/request-subida-imagenesRequest.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  selectedFile: File | null = null;
  isFormSubmitted = false; // controla el estado del formulario
  clienteRegister: RequestCliente;
  mensajeCreador: any;
  mensajeImagen: any;

  constructor(
    private formBuilder: FormBuilder,
    private clienteService: ClienteService,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.registerForm = this.formBuilder.group({
      emailUsu: [
        '',
        [Validators.required, Validators.email],
        [this.existeCliente(this.clienteService)],
      ],
      passwd: [
        '',
        [Validators.required, Validators.minLength(8), this.passwordValidator],
      ],
      fechaNa: ['', [Validators.required, this.ageValidator]],
      nickname: ['', [Validators.required, Validators.maxLength(7)]]
    });
  }

  // validador de si el cliente existe
  existeCliente(clienteService: ClienteService): AsyncValidatorFn {
    return (
      control: AbstractControl
    ): Observable<{ [key: string]: any } | null> => {
      const email = control.value;

      if (!email) {
        // Si el campo está vacío, devuelve un error de tipo 'emailRequired'
        return of({ emailRequired: true });
      }

      return clienteService.isClienteExiste(email).pipe(
        map((result) => (result ? { emailFound: true } : null)),
        catchError(() => of({ emailFound: true }))
      );
    };
  }

  // validador de contraseña
  passwordValidator(
    control: AbstractControl
  ): { [key: string]: boolean } | null {
    const password = control.value;
    if (!password) return { passwordWeak: true };

    const hasUppercase = /[A-Z]/.test(password);
    const hasLowercase = /[a-z]/.test(password);
    const hasNumber = /\d/.test(password);
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>-_]/.test(password);

    return hasUppercase && hasLowercase && hasNumber && hasSpecialChar
      ? null
      : { passwordWeak: true };
  }

  // Validador edad
  ageValidator(control: AbstractControl): { [key: string]: boolean } | null {
    const dob = new Date(control.value);
    const today = new Date();
    let age = today.getFullYear() - dob.getFullYear();
    const month = today.getMonth() - dob.getMonth();
    if (month < 0 || (month === 0 && today.getDate() < dob.getDate())) {
      age--;
    }
    return age >= 18 ? null : { ageInvalid: true };
  }

  onFileSelect(event: any) {
    this.selectedFile = event.files[0];
    console.log(this.selectedFile);
  }

  registerUsu() {
    this.isFormSubmitted = true; // Indica que el formulario ha sido enviado

    if (this.registerForm.valid && this.selectedFile) {
      this.clienteRegister = {
        gmail: this.registerForm.value.emailUsu,
        passwd: this.registerForm.value.passwd,
        nickname: this.registerForm.value.nickname,
        administrador: false,
        fechaNacimiento: this.registerForm.value.fechaNa,
      };

      this.authService.registrarUsuario(this.clienteRegister).subscribe({
        next: (mess) => {
          this.mensajeCreador = mess;
        },
        error: (err) => {
          console.error(err);
        },
        complete: () => {
          console.info('Registro Completado=> ' + this.clienteRegister);
        },
      });

      //------------------------------------------------------

      let datosImg: SubidaImagenRequest = {
        files: this.selectedFile,
        gmail: this.clienteRegister.gmail,
      };

      this.authService.subirImagenPerfil(datosImg).subscribe({
        next: (mess) => {
          this.mensajeImagen = mess;
        },
        error: (err) => {
          console.error(err);
        },
        complete: () => {
          console.info('Imagen Subida=> ' + datosImg);
          sessionStorage.setItem(
            'datosUsu',
            JSON.stringify(this.clienteRegister)
          );
          this.authService.updateUserData(this.clienteRegister);
          this.router.navigate(['/welcome']);
        },
      });
    } else {
      this.registerForm.markAllAsTouched();
    }
  }
}
