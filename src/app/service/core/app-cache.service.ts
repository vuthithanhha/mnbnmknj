import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AppCacheService {

  constructor() {
  }

  setCache(key: string, p: any) {
    localStorage.setItem(key, JSON.stringify(p))
  }

  removeCache(key: string) {
    localStorage.removeItem(key)
  }

  getCache(key: string) {
    let json = null
    try {
      json = JSON.parse(localStorage.getItem(key))
    } catch (e) { }
    return json
  }

  setCookie(name: string, value: string, path: string = '/', expiredDays: number = 0) {
    let expTime: any = expiredDays || 0;
    if (expTime) {
      let d = new Date();
      d.setTime(d.getTime() + (expiredDays * 24 * 60 * 60 * 1000));
      expTime = d.toUTCString();
    }
    document.cookie = name + "=" + value + ";expires=" + expTime + ";path=" + path + ";";
  }

  getCookie(name: string) {
    let cname = name + "=";
    let decodedCookie = decodeURIComponent(document.cookie);
    let cookies = decodedCookie.split(/[\;]+/);
    for (let i = 0; i < cookies.length; i++) {
      let c = cookies[i];
      while (c.charAt(0) == ' ') {
        c = c.substring(1);
      }
      if (c.indexOf(cname) == 0) {
        return c.substring(cname.length, c.length);
      }
    }
    return "";
  }

  deleteCookie(name: string, path: string = '/') {
    document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 UTC;path=" + path + ";";
    this.deleteAllCookies(name);
  }

  deleteAllCookies(name?: string) {
    let decodedCookie = decodeURIComponent(document.cookie);
    console.log('decodedCookie', decodedCookie);
    var cookies = decodedCookie.split(/[\;]+/);
    console.log('cookies', cookies);
    for (let i = 0; i < cookies.length; i++) {
      let c = cookies[i];
      while (c.charAt(0) == ' ') {
        c = c.substring(1);
      }
      let cc = c.split(/[\=]+/);
      console.log('cc', cc);
      var cname = (cc.length > 0) ? cc[0] : c;
      if (name) {
        if (name == cname) {
          document.cookie = cname + "=;expires=Thu, 01 Jan 1970 00:00:00 UTC;";
        }
      } else {
        document.cookie = cname + "=;expires=Thu, 01 Jan 1970 00:00:00 UTC;";
      }
    }
  }
}
