import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  genders = ['male', 'female', 'other'];
  signupForm: FormGroup;
  forbiddenUserNames = ['Chris', 'Anna'];

  ngOnInit() {
    this.signupForm = new FormGroup({
      userData: new FormGroup({
        username: new FormControl(null, [
          Validators.required,
          this.forbiddenNames.bind(this),
        ]),
        email: new FormControl(
          null,
          [Validators.required, Validators.email],
          this.forbiddenEmails
        ),
      }),

      gender: new FormControl('other'),
      hobbies: new FormArray([]),
    });

    //listening for changes

    // this.signupForm.valueChanges.subscribe((value) => {
    //   console.log('listening with current value:', value);
    // });

    // listening for status changes

    this.signupForm.statusChanges.subscribe((status) => {
      console.log('listening with current status:', status);
    });

    //setting values

    // this.signupForm.setValue({
    //   userData: {
    //     username: 'Laurinda',
    //     email: 'laurinda@gemea.com',
    //   },
    //   gender: 'female',
    //   hobbies: [],
    // });

    this.signupForm.patchValue({
      userData: {
        username: 'Laurinda',
      },
    });
  }

  onSubmit() {
    console.log('user submitting following:', this.signupForm);

    //resetting values after submission

    this.signupForm.reset();
  }

  onAddHobby() {
    console.log('user wants to add hobby');
    const control = new FormControl(null, Validators.required);
    (<FormArray>this.signupForm.get('hobbies')).push(control);
  }

  //refer on form: *ngFor="let hobbyControl of getControls(); let i = index"
  getControls() {
    return (<FormArray>this.signupForm.get('hobbies')).controls;
  }

  //custom error handling

  forbiddenNames(control: FormControl): { [s: string]: boolean } {
    if (this.forbiddenUserNames.indexOf(control.value) !== -1) {
      return { nameIsForbidden: true };
    }
    return null;
  }

  //asynchronous error handling (third argument on email FormControl reserved for asynchronous validators)

  forbiddenEmails(control: FormControl): Promise<any> | Observable<any> {
    const promise = new Promise<any>((resolve, reject) => {
      setTimeout(() => {
        if (control.value === 'test@test.com') {
          resolve({ emailIsForbidden: true });
        } else {
          resolve(null);
        }
      }, 1500);
    });
    return promise;
  }
}
