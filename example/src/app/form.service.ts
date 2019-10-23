import { Injectable } from '@angular/core';

export class FormService {
  accountList = [];
  accountTypeList = [];
  formdata:{} = {};
  constructor() {
    this.accountList = [
      {
        "id": "4936860402673657465",
        "type": "Joint/And",
        "title1": "PXNX DXNXTX FXDXLXS I IX",
        "title2": "AXTX-XKX ZXIXNXEX FXDXLXS"
      },
      {
        "id": "4936860403166155298",
        "type": "Sole Owner",
        "title1": "PXNX ZXIXNXEX FXDXLXS",
        "title2": "AXTXFXKX"
      }
    ];
    this.accountTypeList = [
      {
        "id": "001",
        "description": "Sub Account",
        "candiateCurrencyList": [
          {
            "id": "EUR",
            "description": "EUR"
          },
          {
            "id": "CHF",
            "description": "CHF"
          },
          {
            "id": "PLN",
            "description": "PLN"
          },
          {
            "id": "USD",
            "description": "USD"
          }
        ]
      },
      {
        "id": "007",
        "description": "Savings Account",
        "candiateCurrencyList": [
          {
            "id": "GBP",
            "description": "GBP"
          },
          {
            "id": "PLN",
            "description": "PLN"
          },
          {
            "id": "USD",
            "description": "USD"
          },
          {
            "id": "EUR",
            "description": "EUR"
          }
        ]
      },
      {
        "id": "024",
        "description": "Super Saving Account",
        "candiateCurrencyList": [
          {
            "id": "GBP",
            "description": "GBP"
          },
          {
            "id": "USD",
            "description": "USD"
          }
        ]
      }
    ]
    ;
  }
  getAccount(id:string):{}{
    if(!this.formdata.account)return {};
    let arr = this.accountList;
    for(let i=0,len=arr.length;i<len;i++){
      if(arr[i].id === this.formdata.account){
        return arr[i];
      }
    }
  }
  getAccountType(id:string):{}{
    if(!this.formdata.accountType)return {};
    let arr = this.accountTypeList;

    for(let i=0,len=arr.length;i<len;i++){
      if(arr[i].id === this.formdata.accountType){
        return arr[i];
      }
    }
  }
}
