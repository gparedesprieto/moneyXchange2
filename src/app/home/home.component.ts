import {
  Component,
  OnInit,
  Inject
} from '@angular/core';

//import { CORE_DIRECTIVES } from 'angular2/angular2';


import { AppState } from '../app.service';
import { Title } from './title';
import { XLargeDirective } from './x-large';

import { Http } from '@angular/http';

import createNumberMask from 'text-mask-addons/dist/createNumberMask'

// https://github.com/Jackson88/ng2-cache
import {CacheService, CacheStoragesEnum} from 'ng2-cache/ng2-cache';

import { MyService } from '../service/service1';

declare var BUILD_VERSION: string;

const keyDivisa: string = 'APP-keyDivisa'
const expiraMilisegundos: number = 10 * 60 * 1000; // Se configura el MILISEGUNDOS

// Configurar Dólares
const numberMaskDolar = createNumberMask({
  prefix: '$ ',
  suffix: '', // This will put the dollar sign at the end, with a space.
  allowDecimal: true,
  decimalLimit: 4
})

// Configurar Euros
const numberMaskEuro = createNumberMask({
  prefix: '€ ',
  suffix: '', // This will put the dollar sign at the end, with a space.
  allowDecimal: true,
  decimalLimit: 4
})

@Component({
  /**
   * The selector is what angular internally uses
   * for `document.querySelectorAll(selector)` in our index.html
   * where, in this case, selector is the string 'home'.
   */
  selector: 'home',  // <home></home>
  /**
   * We need to tell Angular's Dependency Injection which providers are in our app.
   */
  providers: [
    Title,
    CacheService
    //, MyService
  ],
  /**
   * Our list of styles in our component. We may add more to compose many styles together.
   */
  styleUrls: [ './home.component.css' ],
  /**
   * Every Angular template is first compiled by the browser before Angular runs it's compiler.
   */
  templateUrl: './home.component.html'
})
export class HomeComponent implements OnInit {
  /**
   * Set our default values
   */
  public localState = { value: '' };
  /**
   * TypeScript public modifiers
   */

  public maskDolar = numberMaskDolar
  public maskEuro = numberMaskEuro

  public _exchangeMoneySymbolDefault = "EUR";
  public _todayEntity: todayEntity;
  public model: model;
  //public _divisa: Divisa[];
  public _divisa1 = [];
  public _divisa2 = [];
  
  public _restExchange: restExchange;
  public _restDivisa: restExchange;
  public valueExchange = 0;
  public _Exchange = "";
  //public _localDivisa = "";

  constructor(
    public appState: AppState,
    public title: Title,
    http: Http,
    public _cacheService: CacheService
    //, public _myService: MyService
  ) {

      this._todayEntity = new todayEntity();
      this.model = new model();

      http.get('http://api.fixer.io/latest?base=USD&symbols=' + this._exchangeMoneySymbolDefault).subscribe(result => {
          this._restExchange = result.json();
          
          this._todayEntity = new todayEntity(this._restExchange.base, this._restExchange.date, this._restExchange.rates[this._exchangeMoneySymbolDefault]);

        });

      
      //check if data exists in cache
      let existsDivisa: boolean = this._cacheService.exists(keyDivisa);

      console.dir(existsDivisa);

      if (!existsDivisa) {

        console.log("Recuperar divisa, cache no existe, expira: " + expiraMilisegundos);

        http.get('http://api.fixer.io/latest?base=USD').subscribe(result => {

            //set global prefix as build version
            //this._cacheService.setGlobalPrefix(this.BUILD_VERSION);
            
            //put some data to cache for 1 hour (expires - timestamp with milliseconds)
            this._cacheService.set(keyDivisa, JSON.stringify(result.json()), {expires: Date.now() + expiraMilisegundos});
       
            this._restDivisa = result.json();       
            this.fillDivisa();

        });

      }
      else {
        let dataCache: any|null = this._cacheService.get(keyDivisa);

        console.log("Directo desde cache divisa, expira: " + expiraMilisegundos);
        console.dir(dataCache);
        console.dir ( JSON.parse(dataCache).base );
        console.dir ( JSON.parse(dataCache).date );
        console.dir ( JSON.parse(dataCache).rates );

        this._restDivisa = JSON.parse(dataCache);

        this.fillDivisa();

      }
  }

  private fillDivisa() {
      let data = this._restDivisa.rates;

      const keys   = Object.keys(data);
      const values = Object.keys(data).map(key=>data[key]).map(x => x);

      keys.forEach((item, index) => {
        if (index%2 == 0)
          this._divisa1.push( {name: keys[index], value: values[index] });
        else
          this._divisa2.push( {name: keys[index], value: values[index] });
      });
  }

  public ngOnInit() {
    console.log('hello `Home` component');
    /**
     * this.title.getData().subscribe(data => this.data = data);
     */

    /*this._myService.loaddata().subscribe(data => {
      // do something with the data
      console.dir( data );
    })*/
  }

  public ToExchange() {
    //alert(this._localDivisa)

    var valueEnter = this.model.valueEnter.replace('$', '').replace(',', '') ;
    this.model.valueExchange = String( Number(valueEnter) * Number(this._todayEntity.value) );

  }

  public submitState(value: string) {
    //console.log('submitState', value);
    this.appState.set('value', value);
    this.localState.value = '';

  }

}


class model {

    constructor(
        public valueEnter: string = "",
        public valueExchange: string = ""
    ) {}

}

interface restExchange {
    base: string;
    date: string;
    rates: restExchangeValue[]
}

interface restExchangeValue {
}

interface Divisa {
  base: string;
    value: string;
}

class todayEntity {

    constructor(
        public base: string = "EUR",
        public date: string = "date",
        public value: string = "0.00"
    ) {}

}