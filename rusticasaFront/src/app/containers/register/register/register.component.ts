import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  selectedFile: File | null = null;
  isFormSubmitted = false; // Variable para controlar el estado del formulario

  constructor(private formBuilder: FormBuilder) {
    this.registerForm = this.formBuilder.group({
      emailUsu: ['', [Validators.required, Validators.email]],
      passwd: ['', [Validators.required, Validators.minLength(8), this.passwordValidator]],
      fechaNa: ['', [Validators.required, this.ageValidator]],
      nickname: ['', [Validators.required]]
    });
  }

  ngOnInit(): void {}


  passwordValidator(control: AbstractControl): { [key: string]: boolean } | null {
    const password = control.value;
    if (!password) return null;

    const hasUppercase = /[A-Z]/.test(password);
    const hasLowercase = /[a-z]/.test(password);
    const hasNumber = /\d/.test(password);
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>-_]/.test(password);

    if (hasUppercase && hasLowercase && hasNumber && hasSpecialChar) {
      return null;
    } else {
      return { passwordWeak: true };
    }
  }



  // Validación de la edad
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
      console.log('El formulario no es válido o no se ha cargado una imagen');
    }
  }
}
