import { Component, OnInit } from '@angular/core';
import { PasswordManagerService } from '../password-manager.service';
import { Observable } from 'rxjs';
import { NgForm } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';


@Component({
  selector: 'app-site-list',
  templateUrl: './site-list.component.html',
  styleUrls: ['./site-list.component.css']
})
export class SiteListComponent implements OnInit {
  allsites!: Observable<Array<any>>;

  siteName!: string;
  siteUrl!: string;
  siteImgUrl!: string;
  siteId!: string;

  formState: string = "Add new";

  constructor(private passwordManager: PasswordManagerService, private snackbar: MatSnackBar, private router: Router ) {
    if (!localStorage.getItem('user_id')){
      router.navigate(['/'])
    } else {
    this.loadSites()
    }
  }

  ngOnInit(): void {
  }

  resetForm(form: NgForm) {
    form.resetForm();
    this.formState = "Add new"
  }

  onSubmit(form: NgForm){
    console.log(form.value)
    if (this.formState == "Add new"){
      this.passwordManager.addsite(form.value).then(() => {
        this.resetForm(form)
        this.snackbar.open('New site added successfully!', 'Close',{duration: 5000});
      }).catch((error)=> this.snackbar.open(error, 'Close',{duration: 5000}))
    } else if (this.formState == "Edit"){
      this.passwordManager.updatesite(this.siteId, form.value).then(() => {
        this.resetForm(form)
        this.snackbar.open('Your site data updated successfully!', 'Close',{duration: 5000});
      }).catch((error)=> this.snackbar.open(error, 'Close',{duration: 5000}))
    }
  }

  loadSites(){
    this.allsites = this.passwordManager.loadsites()
  }

  onEdit(siteName: string,siteUrl: string, siteImgUrl: string, id:string){
    this.siteName = siteName
    this.siteUrl = siteUrl
    this.siteImgUrl = siteImgUrl
    this.siteId = id

    this.formState = "Edit"
  }

  onDelete(id: string){
   this.passwordManager.deletesite(id).then(()=>{
    this.snackbar.open('Your site data deleted successfully!', 'Close',{duration: 5000});
   }).catch((error)=> this.snackbar.open(error, 'Close',{duration: 5000})) 
  }
}
