import { Component, OnInit } from '@angular/core';
import {FormService} from '../form.service';
import {Router,ActivatedRoute} from '@angular/router';
import {Location} from '@angular/common';

@Component({
  selector: 'app-page3',
  templateUrl: './page3.component.html',
  styleUrls: ['./page3.component.scss']
})
export class Page3Component implements OnInit {
  accountTypeObj:{};
  constructor(
    public formService: FormService,
    private router: Router,
    private route: ActivatedRoute,
    private location: Location,
  ) { }

  ngOnInit() {
    this.getAccountType();
    if(!this.formService.formdata.account){
      this.router.navigate(['/page1']);
    }else if(!this.formService.formdata.accountType || !this.formService.formdata.currency){
      this.router.navigate(['/page2']);
    }
  }

  getAccountType():void{
    this.accountTypeObj = this.formService.getAccountType(this.formService.formdata.accountType);
  }

  confirmForm():void{
    console.log(this.formService.formdata);
  }
  cancel():void{
    this.router.navigate(['/page2']);
  }
}
