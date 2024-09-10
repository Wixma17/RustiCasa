import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { SafeResourceUrl } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  usuConn:any;
  ruta: SafeResourceUrl;
  modificaForm: FormGroup;
  fecha:string;
  showPasswd:boolean = false;
  selectedFile: File | null = null;

  constructor(private authService: AuthService,private formBuilder: FormBuilder,private router: Router) {}

  ngOnInit(): void {
    if(sessionStorage.getItem('datosUsu')){
      this.usuConn= JSON.parse(sessionStorage.getItem('datosUsu'));

      this.authService.rutaImg$.subscribe((url) => {
        this.ruta = url;
      });

      this.fecha=this.formatDateToDDMMYYYY(this.usuConn.fechaNacimiento);

      this.modificaForm = this.formBuilder.group({
        nombreUsu:[this.usuConn.nombre],
        apeUsu:[this.usuConn.apellido],
        emailUsu:[this.usuConn.gmail],
        passwdUsu:[this.usuConn.passwd],
        dateUsu:[this.fecha]
      });

      console.info(this.usuConn);
    }
  }

  formatDateToDDMMYYYY(isoString: string): string {
    // Convertimos la cadena ISO a un objeto Date
    const date = new Date(isoString);

    // Obtenemos el día, mes y año
    const day = date.getUTCDate().toString().padStart(2, '0'); // Aseguramos dos dígitos para el día
    const month = (date.getUTCMonth() + 1).toString().padStart(2, '0'); // Aseguramos dos dígitos para el mes
    const year = date.getUTCFullYear(); // Obtenemos el año completo

    // Formateamos la fecha en dd/mm/yyyy
    return `${day}/${month}/${year}`;
  }

  showPassword(){
    this.showPasswd=!this.showPasswd;
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

}
