import { Component, OnInit } from '@angular/core';
import {FormService} from '../form.service';
import {Router,ActivatedRoute} from '@angular/router';
import {Location} from '@angular/common';
import {Input} from '@angular/core';
import {Output,EventEmitter} from '@angular/core';

@Component({
  selector: 'app-page2',
  templateUrl: './page2.component.html',
  styleUrls: ['./page2.component.scss']
})
export class Page2Component implements OnInit {
  accountObj: {};
  @Input() account;
  @Output() page1:EventEmitter = new EventEmitter();


  constructor(
    public formService: FormService,
    private router: Router,
    private route: ActivatedRoute,
    private location: Location,
  ) {

  }

  ngOnInit() {
    if(!this.formService.formdata.account){
      this.router.navigate(['/page1']);
    }
    this.getAccountObj();
  }
  getAccountObj():void{
    this.accountObj = this.formService.getAccount(this.formService.formdata.account);
  }
  getCurrencies(index:number){
    if(!this.formService.formdata.accountType)return;
    this.formService.formdata.currencies = this.formService.accountTypeList[index].candiateCurrencyList;
    this.formService.formdata.currency = this.formService.formdata.currencies[0].id;

    this.page1.emit('11');
  }

  nextPage():void{
    if(this.formService.formdata.accountType && this.formService.formdata.currency){
      this.router.navigate(['/page3']);
    }
  }
  cancel():void{
    this.router.navigate(['/page1']);
  }
}
