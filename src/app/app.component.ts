import { Component, OnInit, Output, EventEmitter } from '@angular/core'
import { Router } from "@angular/router"
import { TranslateService, LangChangeEvent } from '@ngx-translate/core';
import { environment } from '../environments/environment'

import { AppUtilsService } from './service'
import { AppStateService } from './service'
import { AppCacheService } from './service'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  constructor(public translate: TranslateService, public state: AppStateService,
    public cache: AppCacheService,
    public router: Router,
    public utils: AppUtilsService,
  ) {
    let langs = ['en', 'vi'];
    //Force to load all lang!
    langs.forEach(lang => {
      translate.getTranslation(lang).subscribe(res => {
        console.log('getTranslation vi ', res);
      });
    });

    translate.addLangs(langs);
    translate.setDefaultLang('en');

    console.log('cookie:', document.cookie)

    let lang = this.utils.getParamQueryString('lang');
    console.log('param lang', lang);
    if (lang && lang.match(/en|vi/)) {
      translate.use(lang);
    } else {
      let lang = this.cache.getCookie('lang');
      if (lang && lang.match(/en|vi/)) {
        console.log('cookie lang', lang);
        translate.use(lang);
      } else {
        let lang = this.cache.getCache('lang');
        if (lang && lang.match(/en|vi/)) {
          console.log('cache lang', lang);
          translate.use(lang);
        } else {
          lang = translate.getBrowserLang();
          console.log('default lang', lang);
          translate.use(lang.match(/en|vi/) ? lang : 'en');
        }
      }
    }
    translate.onLangChange.subscribe((event: LangChangeEvent) => {
      console.log('change lang ....', event.lang);
      this.cache.setCache('lang', event.lang);
      this.cache.setCookie('lang', event.lang, '/', 356);
    });
  }

  async ngOnInit() {
    console.log('Application initialize....')
    // this.router.navigate([localStorage.getItem('__ReloadUrl')]);
  }
}
