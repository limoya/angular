import { Component, OnInit } from '@angular/core';
import {MessageService} from '../message.service';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.scss']
})
export class MessageComponent implements OnInit {

  //因为要在模板中绑定到这个值，所以要用public 【angular 只会绑定到组件的 公共 属性】
  constructor(public messageService: MessageService) { }

  ngOnInit() {
  }

}
