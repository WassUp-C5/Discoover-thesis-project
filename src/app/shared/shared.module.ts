import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
/* Angular material */
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AngularMaterialModule } from './angular-material.module';
import { NavbarComponent } from './components/navbar/navbar.component';
import { MenuComponent } from './components/menu/menu.component';

const modules = [
  CommonModule,
  BrowserAnimationsModule,
  AngularMaterialModule
]
@NgModule({
  declarations: [NavbarComponent, MenuComponent],
  imports: [ ...modules  ],
  exports: [ ...modules, NavbarComponent, MenuComponent]
})
export class SharedModule { }
