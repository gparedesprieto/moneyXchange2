import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import 'rxjs/Rx';
import {Observable} from 'rxjs/Rx'

export class MyService {
  
  public serviceData;

  constructor(public http: Http) { }

  private extractData(res) {

    if (res.status < 200 || res.status >= 300) {
      throw new Error('Bad response status: ' + res.status);
    }

    // console.log(res.json());
    this.serviceData = (res.json());
    return this.serviceData || {};
  }

  loaddata(): Observable<any> {
    return this.http.get('http://api.fixer.io/latest?base=USD') // define a variable server_url to assign the requested url
      .map(this.extractData);
  }
}