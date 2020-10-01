import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map, tap, last, finalize, catchError } from 'rxjs/operators';
import { AppStateService } from './app-state.service';
import { CONSUME_API } from '../consume-apis'

@Injectable({
  providedIn: 'root'
})
export class HttpConnectorService {

  constructor(
    protected state: AppStateService,
    protected httpClient: HttpClient,
    protected router: Router
  ) {
    this.isIE = /(Edge\/)|(Trident\/)|(MSIE\s)/.test(window.navigator.userAgent)
    this.apiUrl = this.unifineURL(this.apiUrl)
    console.log('api base path', this.apiUrl)
  }

  isIE: boolean = false;
  get isLoaded(): boolean {
    return this.state.isLoaded;
  }

  set isLoaded(v: boolean) {
    this.state.isLoaded = v;
  }

  loadingStack: any[] = [];

  apiUrl = CONSUME_API.apiUrl;

  headers = {
    jsondata: {
      'Content-Type': 'application/json; charset=utf-8',
      'Accept': 'application/json'
    },
    formdata: {
      'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8',
      'Accept': 'application/json'
    }
  }

  public buildBodyParam(param: any) {
    let body = new HttpParams();
    if (param) {
      for (let k in param) {
        body = body.set(k, param[k]);
      }
    }
    let ps = body.toString();
    return ps;
  }

  public _alert(message) {
    if (!window['_isAlerted']) {
      window['_isAlerted'] = true;
      alert(message);
      setTimeout(() => {
        window['_isAlerted'] = false;
      }, 10000)
    }
  }

  public handleError(error: any, isNotSilenceLoad: boolean = true) {
    console.log('handleError', error);
    let err = error;
    if (err && err.error) {
      err = err.error;
      if (!err.url) {
        err.url = error.url;
      }
    }
    if (err && (err.status == 401 || err.status == 403) && (err.url && err.url.lastIndexOf('/api/v1/auth/') === -1)) {
      if (err.status == 401) {
        if (isNotSilenceLoad) this._alert('Your session is timed out. Please log in again to continue your works');

      } else {
        if (isNotSilenceLoad) this._alert('Access Denied. Please contact administrator for more information');
        //this.router.navigateByUrl('/ui/login');
      }
    } else if (err && err.status == 500) {
      if (isNotSilenceLoad) this._alert('Could not continue your work due to server problem at this moment. Please contact administrator for more information');
    } else if (err && err.status == 0) {
      if (isNotSilenceLoad) this._alert('Please check user experience of network connection problem and try again');
    } else {
      console.log('Check the log for details of issue')
      let msg = this.parseErrorMessage(err);
      console.log('message', msg)
      if (typeof msg === 'string') {
        this._alert(msg);
      } else {
        let showMsg = (msg.message || msg.error || (msg.status + ' - ' + msg.statusText));
        if (showMsg == 'PERMISSION_DENIED') {
          showMsg = 'Permission denied! Please contact administrator for more information.'
        }
        if (showMsg != 'UNAUTHORIZED') {
          this._alert(showMsg)
        }
      }
    }
  };

  public parseErrorMessage(err: any): any {
    // console.log(err)
    if (typeof err === 'object') {
      if (typeof err._body === 'object') {
        return err
      }
      if (typeof err._body === 'string') {
        try {
          err._body = JSON.parse(err._body)
        } catch (e) { }
      }
      if (typeof err.error === 'string') {
        err.message = err.error
      }
      return err
    }
    if (typeof err === 'string') {
      try {
        err = JSON.parse(err)
      } catch (e) { }
      return err
    }
    return 'An error occurred while communicating with server side. please try again later'
  }

  public _req(method: string, uri: string,
    payload: any = undefined, options: any = undefined,
    isNotSilenceLoad: boolean = true): Observable<any> {
    let url = this.supportIE(this.apiUrl + uri, this.apiUrl)
    console.log('_req url:', method, url)

    let rheaders = options ? (options.headers ? options.headers : this.headers.jsondata) : this.headers.jsondata
    let pl = payload
    if (rheaders['Content-Type'] == this.headers.jsondata['Content-Type']) {
      pl = pl ? JSON.stringify(pl) : undefined
    }

    let headers = {
      'headers': rheaders,
      'withCredentials': true
    };

    if (method === 'get' || method === 'delete' || method === 'head') {
      pl = headers;
      rheaders = undefined;
    }

    if (!(pl && pl.silent)) {
      this.loadingStack.push(method + ':' + uri);
      this.isLoaded = false;
    }

    let req = this.httpClient[method]<any>(url, pl, headers).pipe(tap(event => {
      console.log('TAP event', event);
    }, error => {
      console.log('TAP error', error);
    }),
      finalize(() => {
        this.loadingStack.pop();
        this.isLoaded = (this.loadingStack.length === 0);
        console.log('Finalize')
        return req;
      }),
      catchError(err => {
        this.loadingStack.pop();
        this.isLoaded = (this.loadingStack.length === 0);
        this.handleError(err, isNotSilenceLoad);
        return throwError(err);
      }));
    return req;
  }

  public _reqPromise(method: string, uri: string,
    payload: any = undefined, options: any = undefined): any {
    return new Promise((resolve, reject) => {
      this._req(method, uri, payload, options).subscribe((res: any) => {
        resolve(res);
      }, (err: any) => {
        reject(err);
      })
    });
  }

  public get(uri: string, filter: any = undefined): Observable<any> {
    if (typeof filter == 'object') {
      let params = this.buildBodyParam(filter);
      if (uri.lastIndexOf('?') > 0) {
        uri = uri + '&' + params;
      } else {
        uri = uri + '?' + params;
      }
    }
    return this._req('get', uri);
  }

  public delete(uri: string): Observable<any> {
    return this._req('delete', uri);
  }

  public post(uri: string, payload: any) {
    return this._req('post', uri, payload);
  }

  public put(uri: string, payload: any): Observable<any> {
    return this._req('put', uri, payload);
  }

  public patch(uri: string, payload: any): Observable<any> {
    return this._req('patch', uri, payload);
  }

  public getBlob(uri: string): Observable<any> {
    let url = this.supportIE(uri)
    return this.httpClient.get(url, {
      responseType: 'blob', observe: 'response'
    });
  }

  public postForm(uri: string, param: any): Observable<any> {
    let ps = this.buildBodyParam(param);
    return this._req('post', uri, ps, { 'headers': this.headers.formdata });
  }

  supportIE(url: string, rootUrl?: string): string {
    if (this.isIE) {
      let rand = Math.round(Math.random() * 10000000)
      console.log('Internet Explorer Browser')
      if (url.lastIndexOf('?') > 0) {
        url += '&r' + rand
      } else {
        url += '?r' + rand
      }
    }
    return this.unifineURL(url, rootUrl)
  }
  unifineURL(url: string, rootUrl?: string) {
    if (url.indexOf('http') !== 0) {
      let protocol = location.protocol
      if (url.indexOf('//') !== 0 || url.indexOf('://') !== 0) {
        if (rootUrl && url.indexOf(rootUrl) === -1) {
          url = rootUrl + url
        } else {
          url = protocol + '//' + url
        }
      } else {
        url = protocol + url
      }
    }
    return url;
  }
}
