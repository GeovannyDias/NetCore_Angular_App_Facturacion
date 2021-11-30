import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  @Input() hideSideBar: boolean;
  @Output() eventHideSideBar = new EventEmitter<boolean>();

  constructor() { }

  ngOnInit(): void {
  }

  onHideSideBar() {
    this.hideSideBar = !this.hideSideBar;
    this.eventHideSideBar.emit(this.hideSideBar);
  }


}
