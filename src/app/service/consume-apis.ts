export class CONSUME_API {

  static apiUrl: string = window['apiUrl'] || (location.protocol + '//' + location.host + '/api');

  static ENDUSER = {
    productionsByQrcode: '/v1/end-user/production/info/'
  };

  static FILE: any = {
    saveFile: '/v1/files/saveOfferLetter'
  };

  static PROVINCE = {
    provinces: '/v1/provinces',
    provincesByName: '/v1/provinces/byname',
    addProvince: '/v1/provinces',
    updateProvince: '/v1/provinces',
    deletedProvince: '/v1/provinces',
  }
  static WARRANTY = {
    infoCustomer: '/v1/end-user/active-warranty/'
  }
}
