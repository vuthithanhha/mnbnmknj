import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';

import { SharesModule } from '../shares/shares.module';
import { ProductionComponent } from './production/production.component';
import { WarrantyComponent } from './warranty/warranty.component';
import { ActivatedComponent } from './activated/activated.component';
import { ImageComponent } from './image/image.component';
import { ActivefailedComponent } from './activefailed/activefailed.component';

const routes: Routes = [
  { path: 'production/:qrCode', component: ProductionComponent },
  { path: 'production', component: ProductionComponent },
  { path: 'warranty/:id', component: WarrantyComponent },
  { path: 'activated', component: ActivatedComponent },
  { path: 'image', component: ImageComponent },
  { path: 'activefailed', component: ActivefailedComponent }
]

@NgModule({
  declarations: [
    ProductionComponent,
    WarrantyComponent,
    ActivatedComponent,
    ImageComponent,
    ActivefailedComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SharesModule.forRoot()
  ],
  providers: []
})
export class PublicModule { }
