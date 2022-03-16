import { Component, OnInit, Input } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from '../../../services/authentication.service';
import { Usuario } from '../../../models/usuario';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  invalidLogin = false

  @Input() error: string | null | undefined ;

  form: FormGroup = new FormGroup({
    username: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required)
  });

  constructor(private router: Router,
    private loginservice: AuthenticationService) { }

  ngOnInit() {
  }

  submit() {
    if(this.form.valid) {
      this.checkLogin(this.form.value);
    }
  }


  checkLogin(usuario: Usuario) {
    (this.loginservice.authenticate(usuario.username, usuario.password).subscribe(
      data => {
        this.router.navigate(['pages'])
        this.invalidLogin = false
      },
      error => {
        this.invalidLogin = true
        this.error = error.message;

      }
    )
    );

  }

}
