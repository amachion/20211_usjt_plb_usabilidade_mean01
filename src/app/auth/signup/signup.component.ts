import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { UsuarioService } from '../usuario.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  estaCarregando: boolean = false;

  onSignup(form: NgForm) {
    //console.log(form.value);
    if (form.invalid) return;
    this.usuarioService.criarUsuario(form.value.email, form.value.password);
  }
  constructor(private usuarioService: UsuarioService) { }

  ngOnInit(): void {
  }

}
