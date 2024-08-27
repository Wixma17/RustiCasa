import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;

  constructor(private formBuilder: FormBuilder) {
    this.registerForm = this.formBuilder.group({
      emailUsu: ['', [Validators.required, Validators.email]],
      passwd: ['', [Validators.required]],
      fechaNa: ['', [Validators.required]],
      nickname:['', [Validators.required]],
      imagen:[]
    });
  }

  ngOnInit(): void {
  }

  registerUsu(){
    console.log(this.registerForm.value.emailUsu);
    console.log(this.registerForm.value.passwd);
    console.log(this.registerForm.value.fechaNa);
    console.log(this.registerForm.value.imagen);
  }
}
