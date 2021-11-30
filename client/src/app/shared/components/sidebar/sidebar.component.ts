import { Component, OnInit } from '@angular/core';
// import { ElementRef, ViewChild } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
  /*
  <div #hamburgerBig></div>
  <div #hamburgerSmall></div>
  <div #menu></div>

  @ViewChild('hamburgerBig') hamburgerBig: ElementRef;
  @ViewChild('hamburgerSmall') hamburgerSmall: ElementRef;
  @ViewChild('menu') menu: ElementRef;
  */

  constructor() { }

  ngOnInit(): void {
  }





  // hamburgerClick() {
  //   this.hamburgerBig.nativeElement.classList.toggle('is-active');
  //   this.hamburgerSmall.nativeElement.classList.toggle('is-active');
  //   this.menu.nativeElement.classList.toggle('show');
  // }


  // hamburgerClick() {
  //   const hamBigIsActive = this.hamburgerBig.nativeElement.classList.contains('is-active');
  //   const hamSmallIsActive = this.hamburgerSmall.nativeElement.classList.contains('is-active');
  //   const menuShow = this.menu.nativeElement.classList.contains('show');

  //   if(hamBigIsActive) {
  //    this.renderer.removeClass(this.hamburgerBig.nativeElement, 'is-active');
  //   } else {
  //     this.renderer.addClass(this.hamburgerBig.nativeElement, 'is-active');
  //   }
  //   if(hamSmallIsActive) {
  //    this.renderer.removeClass(this.hamburgerSmall.nativeElement, 'is-active');
  //   } else {
  //     this.renderer.addClass(this.hamburgerSmall.nativeElement, 'is-active');
  //   }
  //   if(hamSmallIsActive) {
  //     this.renderer.removeClass(this.menu.nativeElement, 'show');
  //   } else {
  //     this.renderer.addClass(this.menu.nativeElement, 'show');
  //   }
  // }

}
