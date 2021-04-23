import { Component, OnInit } from '@angular/core';
import { Credential } from '../credential'
import { AppServiceService } from '../app-service.service';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  credentials: Credential = {username:'',password:''};
  error:boolean=false;
  hide = true;

  constructor(public app: AppServiceService, private http: HttpClient, private router: Router) { }

  ngOnInit(): void {
  }

  login() {
    this.app.authenticate(this.credentials, () => {
        this.router.navigateByUrl('/');
    });
    this.error=true;
    return false;
  }

}
