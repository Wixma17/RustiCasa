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

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  selectedFile: File | null = null;
  isFormSubmitted = false; // Variable para controlar el estado del formulario

  constructor(
    private formBuilder: FormBuilder,
    private clienteService: ClienteService
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
      nickname: ['', [Validators.required]],
    });
  }

  existeCliente(clienteService: ClienteService): AsyncValidatorFn {
    return (control: AbstractControl): Observable<{ [key: string]: any } | null> => {
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
  }

  onFileUpload(event: any) {
    console.log('Archivo subido:', this.selectedFile);
  }

  registerUsu() {
    this.isFormSubmitted = true; // Indica que el formulario ha sido enviado

    if (this.registerForm.valid && this.selectedFile) {
      console.log('Email:', this.registerForm.value.emailUsu);
      console.log('Contraseña:', this.registerForm.value.passwd);
      console.log('Fecha de Nacimiento:', this.registerForm.value.fechaNa);
      console.log('Nickname:', this.registerForm.value.nickname);
      console.log('Imagen:', this.selectedFile);
      // Agrega lógica para enviar el archivo junto con los datos del formulario si es necesario.
    } else {
      this.registerForm.markAllAsTouched();
      console.error('El formulario no es válido o no se ha cargado una imagen');
    }
  }
}
