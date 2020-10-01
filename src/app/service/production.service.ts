import { Injectable } from '@angular/core';

import { HttpConnectorService } from './core/http-connector.service'
import { CONSUME_API } from './consume-apis';

@Injectable({
  providedIn: 'root'
})
export class ProductionService {

  constructor(protected xhr: HttpConnectorService) { }
  findByQrCode(qrCode: string) {
    console.log("qrcode:", qrCode);
    return this.xhr.get(CONSUME_API.ENDUSER.productionsByQrcode + qrCode);
  }
  getItems(opt: any = {}) {
    return this.xhr.get(CONSUME_API.PROVINCE.provinces, opt);
  }

  postinfoCustomer(productionId: string, customer: any) {
    return this.xhr.post(CONSUME_API.WARRANTY.infoCustomer + productionId, customer);
  }
}
