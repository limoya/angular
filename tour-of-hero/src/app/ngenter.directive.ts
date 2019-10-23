import {Directive, ElementRef, HostListener, Input} from '@angular/core';

@Directive({
  selector: '[appNgenter]',
  host: {
    '(keypress)': 'enterFunc($event)'
  }
})
export class NgenterDirective {

  // @Input('enterFunc') appNgenter;
  constructor(private el: ElementRef) {
  }

  ngOnInit(){

  }
/*
  ngOnChanges(){
    
  }
*/

  enterFunc(e){
    if(e.keyCode !== 13)return;
    console.log(e);
  }

/*
  @HostListener('keypress') onKeyPress(){
    this.el.nativeElement.style.color = 'red';
  }
*/

}
