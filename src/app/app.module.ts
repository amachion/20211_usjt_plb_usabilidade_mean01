import { NgModule } from '@angular/core';
//remover esse
//import { FormsModule } from '@angular/forms';
//inserir esse
import { ReactiveFormsModule, FormsModule } from '@angular/forms'
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule} from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ClienteInserirComponent } from './clientes/cliente-inserir/cliente-inserir.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MatPaginatorModule } from '@angular/material/paginator';

import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { CabecalhoComponent } from './cabecalho/cabecalho.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { ClienteListaComponent } from './clientes/cliente-lista/cliente-lista.component';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { ClienteService } from './clientes/cliente.service';
import { LoginComponent } from './auth/login/login.component';
import { SignupComponent } from './auth/signup/signup.component';

@NgModule({
  declarations: [
    AppComponent, ClienteInserirComponent, CabecalhoComponent, ClienteListaComponent, LoginComponent, SignupComponent
  ],
  imports: [
    BrowserModule, ReactiveFormsModule, NoopAnimationsModule, MatInputModule, MatCardModule, MatButtonModule, MatPaginatorModule, MatToolbarModule, MatExpansionModule, MatProgressSpinnerModule, FormsModule,
    HttpClientModule, AppRoutingModule
  ],
  providers: [ClienteService],
  bootstrap: [AppComponent]
})
export class AppModule { }
