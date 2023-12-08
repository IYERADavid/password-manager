import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { PasswordManagerService } from '../password-manager.service';
import { Observable } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-password-list',
  templateUrl: './password-list.component.html',
  styleUrls: ['./password-list.component.css']
})
export class PasswordListComponent implements OnInit {
  allpasswords!: Observable<Array<any>>;

  siteId!: string;
  siteName!: string;
  siteUrl!: string;
  siteImgUrl!: string;

  formState: string = "Add new";

  Email!: string;
  UserName!: string;
  Password!: string;
  password_id!: string;


  constructor( private  route: ActivatedRoute, private snackbar: MatSnackBar,
    private passwordmanager: PasswordManagerService, private router: Router ) {
    if (!localStorage.getItem('user_id')){
      router.navigate(['/'])
    } else {
    this.route.queryParams.subscribe((data)=>{
      this.siteId = data.id;
      this.siteName = data.siteName;
      this.siteImgUrl = data.siteImgUrl;
      this.siteUrl = data.siteUrl
    })
    this.loadpasswords()
   }
  }

  ngOnInit(): void {
  }

  loadpasswords() {
    this.allpasswords = this.passwordmanager.loadpasswords(this.siteId)
  }

  resetForm(form: NgForm) {
    form.resetForm();
    this.formState = "Add new"
  }

  onsubmit(form: NgForm) {
    if (this.formState == "Add new"){
      this.passwordmanager.addpaswword(this.siteId, form.value).then(()=>{
        this.resetForm(form)
        this.snackbar.open('New password added successfully!', 'Close',{duration: 5000});
    }).catch((error)=> this.snackbar.open(error, 'Close',{duration: 5000}))
    } else if (this.formState == "Edit"){
      this.passwordmanager.updatepassword(this.siteId,this.password_id,form.value).then(()=>{
        this.resetForm(form)
        this.snackbar.open('Your password data updated successfully!', 'Close',{duration: 5000});
      }).catch((error)=> this.snackbar.open(error, 'Close',{duration: 5000}))
    }
  }

  onEdit(id: string, Email: string, Username: string, Password: string){
    this.password_id = id
    this.Email = Email
    this.UserName = Username
    this.Password = Password

    this.formState = "Edit"
  }

  onDelete(id: string){
   this.passwordmanager.deletepassword(this.siteId, id).then(()=>{
    this.snackbar.open('Your password data deleted successfully!', 'Close',{duration: 5000});
   }).catch((error)=> this.snackbar.open(error, 'Close',{duration: 5000})) 
  }

}
