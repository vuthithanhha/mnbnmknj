import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { PopoverModule, PopoverConfig } from 'ngx-bootstrap/popover';
import { HttpClientModule, HttpClient, HTTP_INTERCEPTORS } from '@angular/common/http';


export function CustomPopoverConfig(): PopoverConfig {
  return Object.assign(new PopoverConfig(), {
    container: 'body',
    outsideClick: true,
    delay: 600
  });
}

// AoT requires an exported function for factories
export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, 'assets/i18n/', '.json');
}