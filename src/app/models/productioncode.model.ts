import { Media } from './meida.model';

export class ProductioncodeModel {
  id?: string;
  salcode?: string;
  barcode?: string;
  sapcode?: string;
  name?: string;
  warranty?: string;
  warrantyAccessories?: string;
  warrantyNotes?: string;
  activatingPoint?: string;
  views?: string;
  updaterId?: string;
  createrId?: string;
  updatedTime?: string;
  createdTime?: string;
  medias?: Media[] = [];
  size?: string;
  feature?: string;
}
