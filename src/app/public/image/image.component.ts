import { Component, OnInit } from '@angular/core';
import { ProductioncodeModel } from 'src/app/models/productioncode.model';
import { ProductionService } from 'src/app/service';

@Component({
  selector: 'app-image',
  templateUrl: './image.component.html',
  styleUrls: ['./image.component.scss']
})
export class ImageComponent implements OnInit {

  productionCode = new ProductioncodeModel();
  constructor(
    private productionService: ProductionService,
  ) { }

  ngOnInit() {
  }

}
