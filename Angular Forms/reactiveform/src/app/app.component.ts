import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { FormBuilder, Validator,FormArray } from '@angular/forms';
import { forbiddenNameValidator } from './shared/user-name.validator';
import { PasswordValidator } from './shared/password.validator';
import { RegistrationService } from './registration.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  registrationForm!: FormGroup;


  get userName()
  {
    return this.registrationForm.get('username');
  }


    get email()
  {
    return this.registrationForm.get('email');
  }


  get alternateEmails()
  {
      return this.registrationForm.get('alternateEmails') as FormArray;
  }

    addAlternateEmail()
    {
      this.alternateEmails.push(this.fb.control(''));
    }









  constructor(private fb: FormBuilder, private _registrationService:RegistrationService){}

  ngOnInit(): void {
    
        this.registrationForm = this.fb.group(
      {
        username: [
          'Vishwas',
          [
            Validators.required,
            Validators.minLength(3),
            forbiddenNameValidator(/admin|root/i)
          ]
        ],
        email:[''],
        subscribe:[false],
        password: [''],
        confirmPassword: [''],
        address: this.fb.group({
          city: [''],
          state: [''],
          postalCode: ['']
        }),
        alternateEmails:this.fb.array([])
      },
      { validators: PasswordValidator } // ✅ FIXED HERE
    );

    this.registrationForm.get('subscribe')?.valueChanges
    .subscribe(checkedValue=>
    {
      const email = this.registrationForm.get('email');

      if(checkedValue)
      {
        email?.setValidators(Validators.required);
      }
      else{
        email?.clearValidators();
      }
      email?.updateValueAndValidity();
    }
    )
  }




  // registrationForm = new FormGroup({
  //   username: new FormControl(''),
  //   password: new FormControl(''),
  //   confirmPassword: new FormControl(''),
  //   address: new FormGroup({
  //     city: new FormControl(''),
  //     state: new FormControl(''),
  //     postalCode: new FormControl('')
  //   })
  // });

loadApiData() {
  this.registrationForm.setValue({
    username: 'john_doe',
    email: 'john@gmail.com',
    subscribe: true,
    password: '123456',
    confirmPassword: '123',
    address: {
      city: 'Bangalore',
      state: 'Karnataka',
      postalCode: '560001'
    }
  });
}


onSubmit() {
  this._registrationService.register(this.registrationForm.value)
    .subscribe({
      next: (response: any) => {
        console.log('success', response);
         
      },
      error: (error: any) => console.error('Error!', error)
    });
}

}
