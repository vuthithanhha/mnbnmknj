import { Media } from './meida.model';

export class ProductionModel {
  id?: string;
  name: string;
  qrcode?: string;
  qrcode2?: string;
  status?: string;
  salcode: string;
  barcode?: string;
  sapcode?: string;
  quantityUnit?: string;
  updaterId?: string;
  updatedTime?: string;
  createdTime?: string;
  size?: string;
  feature?: string;
  medias?: Media[] = [];

}
