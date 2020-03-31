import { Component, OnInit } from '@angular/core';
import { UserService } from '../../shared/user.service';
import { ActivatedRoute} from '@angular/router';
import { NgForm } from '@angular/forms';
import { format } from 'url';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css'],

})
export class SignUpComponent implements OnInit {

  // tslint:disable-next-line: max-line-length
  emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  showSuccessMessege: boolean;
  serverErrorMesseges: string;
  constructor(private userService: UserService ) { }

  ngOnInit() {
  }

  onSubmit(form: NgForm){
      this.userService.postUser(form.value).subscribe(
        res => {
          this.showSuccessMessege = true;
          setTimeout(() => this.showSuccessMessege = false,4000,);
          this.resetForm(form);
        },
        err => {
            if(err.status == 422) {
              this.serverErrorMesseges = err.error.join('<br />');
            }else
            this.serverErrorMesseges = 'Something went wrong.Please contact admin';
        }
      );
  }

  resetForm(form : NgForm) {
    this.userService.selectedUser = {
      fullName: '',
      email:'',
      password: ''
    };
    form.resetForm();
    this.serverErrorMesseges = '';
  }

}

