import { Component } from '@angular/core';
import { User } from './user';
import { FormsModule, NgModel } from '@angular/forms';
import { EnrollmentService } from './enrollment.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
  
})



export class AppComponent {

  topicHasError:boolean=true;

  submitted:boolean=false;

  errorMsg='';


  topics: string[] = ['Angular', 'TypeScript', 'JavaScript', 'HTML', 'CSS'];

  userModel = new User("Gurur","gfvgl@jhg",5676374678, "Morning", false,'');

  constructor(private _enrollmentService:EnrollmentService){}

  validateTopic(value:string):void
  {
    if(value === 'default'  || value === '')
    {
      this.topicHasError = true;
    }
    else{
      this.topicHasError = false;
    }
  }

  onSubmit(userForm:any): void 
    {

      console.log(userForm)
      // this.submitted = true;
      // this._enrollmentService.enroll(this.userModel)
      //   .subscribe({
      //     next: data => {
      //       console.log('Success!', data);
      //     },
      //     error: error => {
      //        this.errorMsg = error.statusText
      //     }
      //   });
    }

}
