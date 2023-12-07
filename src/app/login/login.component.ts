import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { PasswordManagerService } from '../password-manager.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private passwordmanager: PasswordManagerService, private snackbar: MatSnackBar, private router: Router) { }

  ngOnInit(): void {
  }

  onsubmit (values: any) {
    this.passwordmanager.login(values.Email, values.Password).then(()=>{
      this.router.navigate(["/site-list"])
      this.snackbar.open('logged in successfully!', 'Close',{duration: 5000});
    }).catch(()=>{
      this.snackbar.open('Your email or password is invalid!', 'Close',{duration: 5000});
    })
  }

}
