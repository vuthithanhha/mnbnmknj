import { Component, OnInit } from '@angular/core';
import { ProductionService } from '../../service';
import { ProductionModel } from '../../models/production.model';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductioncodeModel } from 'src/app/models/productioncode.model';
import { Media } from 'src/app/models/meida.model';

@Component({
  selector: 'app-production',
  templateUrl: './production.component.html',
  styleUrls: ['./production.component.scss']
})
export class ProductionComponent implements OnInit {

  constructor(private productionService: ProductionService,
    private activatedRoute: ActivatedRoute,
    protected router: Router) { }
  url;
  id: string;
  qrCode;
  salCode;
  production = new ProductionModel();
  productionCode = new ProductioncodeModel();
  custForm: FormGroup;
  provinces;
  listMedia: any = [];
  listMedias: Media[] = [];
  media: Media = new Media();
  ngOnInit() {
    this.qrCode = this.activatedRoute.snapshot.paramMap.get('qrCode');
    console.log("qrCode: ", this.qrCode)
    if (this.qrCode) {
      this.getProduction(this.qrCode);

    } else {
      alert("Không tìm thấy thông tin sản phẩm phù hợp!")
    }
  }
  getProduction(qrCode) {
    this.productionService.findByQrCode(qrCode).subscribe(res => {
      this.production = res.result;
      console.log("res*****: ", res)
    });
  }
  // getProduct(salCode) {
  //   this.productionService.findBySalCode(salCode).subscribe(res => {
  //     this.productionCode = res;
  //     console.log("productionCode*****: ", this.productionCode)

  //   });
  // }
  // getProduct(salCode) {
  //   this.productionService.findBySalCode(salCode).subscribe(res => {
  //     this.productionCode = res.content[0];
  //     this.listMedia = this.productionCode.medias;
  //     console.log("productionCode*****: ", this.productionCode)
  //     console.log("listMedia*****: ", this.productionCode.medias)
  //   });
  // }


  activeWarranty(productionId) {
    console.log("id****: ", productionId)
    this.router.navigate(['/warranty', productionId]);
  }

  get hasProd() {
    return this.qrCode && this.production && this.production.id;
  }

}
