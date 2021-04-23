import { Component, OnInit,Input } from '@angular/core';
import { AppServiceService } from '../app-service.service';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css']
})
export class ToolbarComponent implements OnInit {
  @Input() authenticated:boolean=false;


  constructor(public app: AppServiceService, private http: HttpClient, private router: Router) {
   
  
  }


  ngOnInit(): void {
  }

  logout(){
    this.app.logout();
    localStorage.setItem("heello","world");
  }


}
