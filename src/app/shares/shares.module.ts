import { NgModule } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';

import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { HttpClientModule, HttpClient } from '@angular/common/http';

import { HttpModule } from '@angular/http';
import { DatePipe } from '@angular/common';

import { ToastrModule } from 'ngx-toastr';

import { NgxPaginationModule } from "ngx-pagination";

import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { PopoverModule, PopoverConfig } from 'ngx-bootstrap/popover';
import { ModalModule } from 'ngx-bootstrap/modal';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { CollapseModule } from 'ngx-bootstrap/collapse';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';

import { AutocompleteLibModule } from 'angular-ng-autocomplete';

import { HttpLoaderFactory, CustomPopoverConfig } from '../globals';
import {
  SafePipe,
  LinkPipe,
  ShortenPipe,
  SortingPipe,
} from '../pipe'

const routes: Routes = [
];

@NgModule({
  declarations: [
    SafePipe,
    LinkPipe,
    ShortenPipe,
    SortingPipe,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    ReactiveFormsModule,
    FormsModule,
    AutocompleteLibModule,
    HttpModule, HttpClientModule,
    TranslateModule,
    TabsModule.forRoot(),
    BsDatepickerModule.forRoot(),
    CollapseModule.forRoot(),
    BsDropdownModule.forRoot(),
    NgxPaginationModule,
    ToastrModule.forRoot({
      timeOut: 6000,
      positionClass: 'toast-bottom-right',
      preventDuplicates: true
    }),
    ModalModule.forRoot(),
    PopoverModule.forRoot(),
  ],
  providers: [
    { provide: PopoverConfig, useFactory: CustomPopoverConfig }
  ],
  exports: [
    AutocompleteLibModule,
    ReactiveFormsModule,
    RouterModule,
    FormsModule,
    BsDatepickerModule,
    NgxPaginationModule,
    TranslateModule,
    PopoverModule,
    ToastrModule,
    TabsModule,
    CollapseModule,
    BsDropdownModule,
    DatePipe,
    SafePipe,
    LinkPipe,
  ]
})
export class SharesModule {
  static forRoot() {   // pattern for adding app-wide services
    return {
      ngModule: SharesModule,
      providers: [{ provide: PopoverConfig, useFactory: CustomPopoverConfig }]
    }
  }
}
