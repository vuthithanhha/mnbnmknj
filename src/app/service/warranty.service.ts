import { Injectable } from '@angular/core';

import { HttpConnectorService } from './core/http-connector.service'
import { CONSUME_API } from './consume-apis';

@Injectable({
  providedIn: 'root'
})
export class WarrantyService {

  constructor(protected xhr: HttpConnectorService) { }
  // findByName(name: string) {
  //   return this.xhr.get(CONSUME_API.PRODUCTION.productionsByQrcode, { name: name });
  // }
}
