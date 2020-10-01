import { Injectable, EventEmitter, Output } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AppStateService {

  isLoaded: boolean = true
  enableBgBlur: boolean = true

  @Output() menuHamburgerToggleEvent = new EventEmitter<any>();

  selectedItem: any = {};
  bizRoles: any = ['BASIC', 'PROFESSIONAL', 'BUSINESS']
  regId: any = '';
  roles: any = [
    {
      "value": "SUPER",
      "name": "Administrator"
    },
    {
      "value": "STAFF",
      "name": "Staff"
    },
    {
      "value": "STORE_MANAGER",
      "name": "Warehouse Manager"
    },
    {
      "value": "STORE",
      "name": "Warehouse Staff"
    },
    {
      "value": "SALE_MANAGER",
      "name": "Sale Manager"
    },
    {
      "value": "SALE",
      "name": "Sale"
    },
    {
      "value": "DISTRIBUTER",
      "name": "Distributer"
    },
    {
      "value": "AGENCY",
      "name": "Agency"
    },
    {
      "value": "SHOP",
      "name": "Shop"
    }
  ]
}
