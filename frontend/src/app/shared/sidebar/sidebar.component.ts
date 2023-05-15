import { Component } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { sidebarList } from 'src/app/utils/constants';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
})
export class SidebarComponent {
  navList: any = sidebarList;

  constructor(private authService: AuthService) {}

  logOut() {
    this.authService.logOutUser();
  }
}
