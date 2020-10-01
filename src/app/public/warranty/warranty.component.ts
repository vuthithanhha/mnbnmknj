import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProductionService } from 'src/app/service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-warranty',
  templateUrl: './warranty.component.html',
  styleUrls: ['./warranty.component.scss']
})
export class WarrantyComponent implements OnInit {
  custForm: FormGroup;
  provinces;
  productionId: string = "";
  constructor(private location: Location,
    private fb: FormBuilder,
    private productionService: ProductionService,
    protected route: ActivatedRoute,
    protected router: Router) {
  }

  ngOnInit() {
    this.productionId = this.route.snapshot.paramMap.get('id');
    this.initForm();
    this.getProvinces();
  }

  initForm() {
    this.custForm = this.fb.group({
      buyerAddress: ['', [Validators.required]],
      buyerEmail: ['', [Validators.required]],
      buyerName: [',', [Validators.required]],
      buyerPhone: ['', [Validators.required]],
      buyerProvince: ['', [Validators.required]],
    });
  }

  updateInfoCus() {
    const formData = new FormData();
    formData.append('buyerAddress', this.custForm.get('buyerAddress').value);
    formData.append('buyerEmail', this.custForm.get('buyerEmail').value);
    formData.append('buyerName', this.custForm.get('buyerName').value);
    formData.append('buyerPhone', this.custForm.get('buyerPhone').value);
    formData.append('buyerProvince', this.custForm.get('buyerProvince').value);
    this.productionService.postinfoCustomer(this.productionId, formData).subscribe((res) => {
      console.log(res);
      this.custForm = res;
    })
  }
  getProvinces() {
    this.productionService.getItems({ 'page': 0, 'size': 100 }).subscribe(res => {
      this.provinces = res.result.content;
      console.log("province: ", this.provinces);
    });
  }
  goBack() {
    this.location.back();
  }
  activeWarranty(it) {
    return new Promise((resolve, reject) => {
      this.productionService.postinfoCustomer(this.productionId, it)
        .subscribe(res => {
          if (res.message == "success") {
            this.router.navigate(['/activated']);
            return resolve(res);
          }
          else {
            this.router.navigate(['/activefailed']);
            return reject(res);
          }
        })
    })
  }

}
