import { Injectable } from '@angular/core';
declare var inAppPurchase: any;
declare var navigator: any;

@Injectable()
export class PurchasesService {

  constructor() { }

  async loadProducts(id) {
    let response = await inAppPurchase.getProducts(id).then(function (products) {
      return products;
    })
      .catch(function (err) {
        return navigator.notification.alert('This service isn\'t currently available', null, 'OurApp', 'ok');
      });
    return response;
  }
  async buy(productId) {
    if (productId) {
      let response = await inAppPurchase.buy(productId).then(function (data) {
        return inAppPurchase.consume(data.type, data.receipt, data.signature);
      })
        .then(function () {
        })
        .catch(function (err) {
          return navigator.notification.alert('This service isn\'t currently available', null, 'OurApp', 'ok');
        });
      return response;
    }
    return false;
  }
  async restorePurchases() {
    let response = await inAppPurchase.restorePurchases().then(function (purchases) {
      return purchases;
    })
      .catch(function (err) {
        return err
      });
    return response;
  }

}
