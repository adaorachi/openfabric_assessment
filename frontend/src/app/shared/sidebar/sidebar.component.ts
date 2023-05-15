import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { sidebarList } from 'src/app/utils/constants';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css'],

})
export class SidebarComponent {
  private authenticatedSub: Subscription;

  navList: any = sidebarList;
  isAuthenticated: boolean = false;


  @Input() isDrawerOpen: boolean = false;

  @Output() closeDrawerEvent = new EventEmitter<boolean>();

   onCloseDrawer(value:  boolean) {
    this.closeDrawerEvent.emit(value);
   }
  
  constructor(private authService: AuthService) {}

   ngOnInit() {

    this.authenticatedSub = this.authService
      .getAuthenticatedSub()
      .subscribe((status) => {
        this.isAuthenticated = status;
      });

    this.isAuthenticated = this.authService.getIsAuthenticated();
  }

  logOut() {
    this.authService.logOutUser();
    this.onCloseDrawer(false)
  }

  ngOnDestroy() {
    this.authenticatedSub.unsubscribe();
  }
}
