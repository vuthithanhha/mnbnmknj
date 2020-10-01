// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  paypal: {
    enable: true,
    clientId: 'AcjzMMCo71hGFJWsbIo8myJJfTGqt2PECiIwyBcBPwQyvI3uPhPrLJMK7PxO8uqkTypIy0z8XdpPyvcW',
    endpoint: 'https://www.paypal.com/sdk/js',
  },

  google: {
    clientId: '564098287898-rk6o7jcg694815a01l5i4poescuql88q.apps.googleusercontent.com',//"Google-OAuth-Client-Id"
  },
  facebook: {
    clientId: '895558514293024',//"Facebook-App-Id"
  }

};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
