import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Credential } from './Model/credential';
import { User } from './Model/user';
import { Router } from '@angular/router';
import { finalize } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AppServiceService {
  authenticated = false;
  user : User ={name :''};
  private userURL:string="http://localhost:8080/api/v1/exchanges/user";
  private logoutURL:string="http://localhost:8080/logout";

  
  constructor(private http: HttpClient,private router: Router) { }

  authenticate(credentials:Credential, callback:()=>void ) {


    const headers = new HttpHeaders(credentials ? {
        authorization : 'Basic ' + btoa(credentials.username + ':' + credentials.password)
    } : {});

    this.http.get<User>(this.userURL, {headers: headers}).subscribe(response => {
      
      if(response['name']){
        this.authenticated=true;
       
      }else{
        this.authenticated=false;

      }

      return callback && callback();     
  
  });
  }

  
  isLogin():boolean { 
    return this.authenticated;
  }

  logout() {
    this.http.post(this.logoutURL, {}).pipe(finalize(() => {
        this.authenticated=false;
        this.router.navigateByUrl('/login');
    })).subscribe(x=>{console.log(x)});
  }

}
