import { Component, OnInit } from '@angular/core';
import {FormService} from '../form.service';
import {Router,ActivatedRoute} from '@angular/router';
import {Page2Component} from '../page2/page2.component';

@Component({
  selector: 'app-page1',
  templateUrl: './page1.component.html',
  styleUrls: ['./page1.component.scss']
})
export class Page1Component implements OnInit {
  accountIndex:number;
  bgColor: string = 'fff';
  constructor(
    public formService: FormService,
    private router: Router,
    private route: ActivatedRoute
  ) {

  }

  ngOnInit() {
    this.formService.formdata.account = this.formService.formdata.account || this.formService.accountList[0].id;
  }

  nextPage():void{
    if(!this.formService.formdata.account)return;
    console.log(this.formService.formdata);
    this.router.navigate(['/page2']);
  }

  cancelRadio():void{
    this.formService.formdata.account = "";
  }

  aaa(e):void{
    console.log(e);
  }
}
