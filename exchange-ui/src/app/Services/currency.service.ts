import { Injectable, NgModule } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse,HttpParams } from '@angular/common/http';
import { Observable, throwError, of} from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { Currency } from '../Model/currency';
import { Exchange } from '../Model/exchange';

@Injectable({
  providedIn: 'root'
})
export class CurrencyService {

  
  
  constructor(private http: HttpClient) { 
    
   }

  findCurrencies(){
    const getCurrenciesURL:string="http://localhost:8080/api/v1/exchanges/currencies";
    return this.http.get<Currency[]>(getCurrenciesURL).pipe(catchError(this.handleError<Currency[]>('findCurrencies')));
  }

  findExchange(cryFrom:string,cryTo:string,amt:number): Observable<Exchange>{
    const getExchangeURL:string="http://localhost:8080/api/v1/exchanges/exchange";
    const params = new HttpParams()
    .set('currencyfrom', cryFrom)
    .set('currencyto', cryTo)
    .set('amount',amt+"");
    return this.http.get<Exchange>(getExchangeURL,{params}).pipe(catchError(this.handleError<Exchange>('findExchange')));

  }
  /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
}
