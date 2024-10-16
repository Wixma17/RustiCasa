import { CasaResponse } from 'src/app/shared/model/responses/casa-response.model';
import { CasaService } from './../../../shared/services/casa.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {

  }

  goFaqs(){
    this.router.navigate(['/faqs']);
  }

  goWelcome(){
    this.router.navigate(['/welcome']);
  }

  goSearch(){
    this.router.navigate(['/full-search']);
  }

  goUpdate(){
    this.router.navigate(['/upload-house']);
  }
}
