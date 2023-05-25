import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

// Para realizar requisições HTTP
import { HttpClientModule } from '@angular/common/http';

// Para trabalhar com formulários no Angular
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

// Imports para componentes do Angular Material
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatTabsModule } from '@angular/material/tabs';
import { MatTableModule } from '@angular/material/table';
import { MatCardModule } from '@angular/material/card';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatDialogModule } from '@angular/material/dialog';

// Componentes do projeto
import { DatePipe } from '@angular/common';
import { ToastrModule } from 'ngx-toastr';
import { NgxMaskDirective, NgxMaskPipe, provideNgxMask } from 'ngx-mask'

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { CustomerComponent } from './customer/customer.component';
import { CustomerService } from './services/customer.service';
import { DialogComponent } from './dialog/dialog.component';

import { DateFnsModule } from 'ngx-date-fns'

@NgModule({
  declarations: [
    AppComponent,
    CustomerComponent,
    DialogComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    MatSlideToggleModule,
    MatButtonModule,
    MatDividerModule,
    MatToolbarModule,
    MatIconModule,
    MatInputModule,
    MatTabsModule,
    MatTableModule,
    MatCardModule,
    MatPaginatorModule,
    MatDialogModule,
    ToastrModule.forRoot(),
    NgxMaskDirective,
    NgxMaskPipe,
    AppRoutingModule,
    BrowserAnimationsModule,
    DateFnsModule.forRoot()
  ],
  providers: [
    CustomerService,
    DatePipe,
    provideNgxMask()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
