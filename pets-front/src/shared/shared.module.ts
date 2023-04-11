import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './components/header/header.component';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { PageNotFoundComponent } from './components/page-not-found.component';


@NgModule({
  declarations: [
    HeaderComponent,
    PageNotFoundComponent,
  ],
  exports: [
    HeaderComponent,
    PageNotFoundComponent,
  ],
  imports: [
    CommonModule,
    MatIconModule,
    MatMenuModule,
    MatButtonModule
  ]
})
export class SharedModule {
}
