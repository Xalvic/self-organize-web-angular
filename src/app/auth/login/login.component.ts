import { Component, OnInit } from '@angular/core';
import { trigger, style, animate, transition } from '@angular/animations';
import { FormGroupDirective, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CreateService } from "../../services/create.service";
import { Router } from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  animations: [
    trigger('openClose', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(-20%)' }),
        animate('100ms', style({ opacity: 1, transform: 'translateY(0)' })),
      ]),
      transition(':leave', [
        animate('100ms', style({ opacity: 0, transform: 'translateY(-20%)' })),
      ]),
    ]),
  ],
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;

  submitLoader: boolean = false;

  constructor(
    public fb: FormBuilder,
    private _create: CreateService,
    private _router: Router,
  ) { 

    this.loginForm = fb.group({
      email: ['', [Validators.email, Validators.email]],
      password: ['', [Validators.required]]
    });

   }

  ngOnInit(): void {
    
  }

  get formControls() {
    return this.loginForm.controls;
  }

  login() {
    if(this.loginForm.valid) {
      this.submitLoader = true;
      this._create.login(this.loginForm.value).subscribe(
        (res) => {
          console.log(res);
          localStorage.setItem('token', res.token);
          this._router.navigate(['/pages/worklogs'])
          this.submitLoader = false;
        },
        (err) => {
          console.log(err);
          this.submitLoader = false;
        }
      )
      //console.log(this.loginForm.value);
    }
  }

}
