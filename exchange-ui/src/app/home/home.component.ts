import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Currency } from '../Model/currency';
import { CurrencyService } from '../Services/currency.service';
import { Exchange } from '../Model/exchange';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  exchangerForm:FormGroup; 

  currencies:Currency[]=[];
  exchange:Exchange={currencyFrom:'',currencyTo:'',amtFrom:0,result:0,validFrom:''};
  cryFrom:FormControl;
  cryTo:FormControl;
  amt:FormControl;

  constructor(private cryService:CurrencyService) {
    this.cryFrom =new FormControl('',Validators.required);
    this.cryTo=new FormControl('',Validators.required);
    this.amt=new FormControl('',Validators.min(0));

    this.exchangerForm =new FormGroup({
      cryFrom:this.cryFrom ,
      cryTo: this.cryTo,
      amt: this.amt
    });
    
   }

  ngOnInit(): void {

    this.cryService.findCurrencies().subscribe(data=>this.currencies=data);
   

  }

  getCurrencyFrom(){return this.exchangerForm.get('cryFrom');}
  getCurrencyTo(){return this.exchangerForm.get('cryTo');}
  getAmount(){return this.exchangerForm.get('amt');}

  onSubmit() {
    let cryf=this.getCurrencyFrom()?.value;
    let cryt=this.getCurrencyTo()?.value;
    let amount=this.getAmount()?.value;
    this.cryService.findExchange(cryf,cryt,amount).subscribe(data=>this.exchange=data);
  }

}
