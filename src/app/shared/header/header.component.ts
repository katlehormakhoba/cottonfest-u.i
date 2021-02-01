import { UserService } from './../../components/authorization/shared/service/user.service';
import { Component, Input, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  @Input('isAuthenticated') isAuthenticated: boolean = false;
  @Input('username') username: string = 'user';
  @Input('logout') logout = () => {};
  @Input('userPhoto') userPhoto: string = '';


  errors = [];

  constructor(
    private userService: UserService,
    private spinner: NgxSpinnerService,
    private router: Router) { }

  ngOnInit(): void {
  }

  deleteMe(){
    this.spinner.show();
    this.errors = [];
    return this.userService.deleteMe().subscribe( data => {

      this.logout();
      this.router.navigate(['/'], {
        queryParams: { message: 'Account Removed Successfully ' }
      });
      this.spinner.hide();
    }, errors => {
      this.errors[0] = errors;
      this.spinner.hide();
    });

  }

}
