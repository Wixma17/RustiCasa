import { Toast } from 'bootstrap';
import { Component, OnInit, ViewChild } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup } from '@angular/forms';
import { SafeResourceUrl } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { RequestCliente } from 'src/app/shared/model/requests/request-register.model';
import { SubidaImagenRequest } from 'src/app/shared/model/requests/request-subida-imagenesRequest.model';
import { AuthService } from 'src/app/shared/services/auth.service';
import { ClienteService } from 'src/app/shared/services/cliente.service';
import { FileUpload } from 'primeng/fileupload';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  usuConn: any;
  ruta: SafeResourceUrl;
  modificaForm: FormGroup;
  fecha: string;
  showPasswd: boolean = false;
  selectedFile: File | null = null;
  @ViewChild('fileUploader') fileUploader: FileUpload | undefined;

  constructor(
    private authService: AuthService,
    private formBuilder: FormBuilder,
    private router: Router,
    private clienteService:ClienteService
  ) {}

  ngOnInit(): void {
    if (sessionStorage.getItem('datosUsu')) {
      this.usuConn = JSON.parse(sessionStorage.getItem('datosUsu'));

      this.authService.rutaImg$.subscribe((url) => {
        this.ruta = url;
      });

      this.fecha = this.formatDateToDDMMYYYY(this.usuConn.fechaNacimiento);

      this.modificaForm = this.formBuilder.group({
        nombreUsu: [this.usuConn.nombre],
        apeUsu: [this.usuConn.apellido],
        emailUsu: [this.usuConn.gmail],
        passwdUsu: [this.usuConn.passwd, [this.passwordValidator]],
        dateUsu: [this.fecha, [this.ageValidator]],
        nicknameUsu: [this.usuConn.nickname],
      });
    }
  }

  formatDateToDDMMYYYY(isoString: string): string {
    // Convertimos la cadena ISO a un objeto Date
    const date = new Date(isoString);

    // Obtenemos el día, mes y año
    const day = date.getUTCDate().toString().padStart(2, '0');
    const month = (date.getUTCMonth() + 1).toString().padStart(2, '0');
    const year = date.getUTCFullYear();

    // Formateamos la fecha en dd/mm/yyyy
    return `${day}/${month}/${year}`;
  }

  showPassword() {
    this.showPasswd = !this.showPasswd;
  }

  onFileSelect(event: any) {
    this.selectedFile = event.files[0];
    console.log(this.selectedFile);
  }

  logout() {
    this.authService.clearUserData();
    sessionStorage.removeItem('datosUsu');
    this.router.navigate(['/login']);
  }

  guardarCambios() {
    let clienteModify: RequestCliente = {
      gmail: this.modificaForm.value.emailUsu,
      nombre: this.modificaForm.value.nombreUsu,
      apellido: this.modificaForm.value.apeUsu,
      passwd: this.modificaForm.value.passwdUsu,
      nickname: this.modificaForm.value.nicknameUsu,
      administrador: false,
      fechaNacimiento: this.convertStringToDate(
        this.modificaForm.value.dateUsu
      ),
    };

    this.authService.registrarUsuario(clienteModify).subscribe({
      next: (info) => {
        console.info(info);
      },
      error: (err) => {
        console.error(err);
      },
      complete: () => {
        if (this.selectedFile) {
          let imgUsu: SubidaImagenRequest = {
            files: this.selectedFile,
            gmail: clienteModify.gmail,
          };

          this.authService.subirImagenPerfil(imgUsu).subscribe({
            next: (info) => {

              this.clienteService.getRutaFotoPerfil(this.usuConn.gmail).subscribe((rutaImage)=>{
                this.ruta = rutaImage.urlImg;
              });

              this.authService.rutaImg$.subscribe((url) => {
                this.ruta = url;
              });


              this.authService.updateUserData(clienteModify);

              this.clearFileUpload();

            },
            error: (err) => {
              console.error(err);
            }
          });
        }

        sessionStorage.removeItem('datosUsu');
        sessionStorage.setItem('datosUsu', JSON.stringify(clienteModify));

      },
    });

    const toastElement = document.getElementById('liveToast');
    if (toastElement) {
      const toast = new Toast(toastElement);
      toast.show();
    }
  }

  convertStringToDate(dateInput: any): Date | null {
    // Si el valor ya es un objeto Date, lo retornamos
    if (dateInput instanceof Date) {
      return dateInput;
    }

    // Si el valor es una cadena, intentamos convertirla a una fecha
    if (typeof dateInput === 'string') {
      const [day, month, year] = dateInput.split('/').map(Number);
      return new Date(year, month - 1, day);
    }

    console.error(
      'El valor proporcionado no es una cadena ni un objeto Date:',
      dateInput
    );
    return null;
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

  clearFileUpload() {
    if (this.fileUploader) {
      this.fileUploader.clear(); // Método para limpiar el componente p-fileUpload
      this.selectedFile = null; // Opcional: Limpia la variable `selectedFile`
    }
  }
}
