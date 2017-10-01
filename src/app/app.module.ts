import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
//import { MaterialModule } from '@angular/material';
import { MdButtonModule, MdCheckboxModule, MdCardModule, MdMenuModule, MdToolbarModule, MdIconModule } from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatGridListModule } from '@angular/material';
import { MatAutocompleteModule } from '@angular/material';

import 'hammerjs';
import { AppComponent } from './app.component';
import { MenuComponent } from './menu/menu.component';
import { DishdetailComponent } from './dishdetail/dishdetail.component';

import { DishService } from './services/dish.service';

@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    DishdetailComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpModule,
    //MaterialModule,
    MdButtonModule, 
    MdCheckboxModule,
    MdCardModule, 
    MdMenuModule, 
    MdToolbarModule, 
    MdIconModule,
    FlexLayoutModule,
    MatGridListModule,
    MatAutocompleteModule
  ],
  providers: [
    DishService
  ],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule { }
