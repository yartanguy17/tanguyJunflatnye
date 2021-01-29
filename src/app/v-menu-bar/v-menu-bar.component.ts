import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-v-menu-bar',
  templateUrl: './v-menu-bar.component.html',
  styleUrls: ['./v-menu-bar.component.css']
})
export class VMenuBarComponent implements OnInit {

  constructor() { }

  showmenu:boolean = false

  onShowSmMenu() {
    if (this.showmenu) {
      this.showmenu = false
    } else {
      this.showmenu = true
    }
  }

  ngOnInit(): void {
    

  }

}
