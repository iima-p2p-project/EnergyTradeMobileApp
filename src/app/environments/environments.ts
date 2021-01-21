// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false
};

export const devAddress = "http://139.59.30.90:8080";
export const uatAddress = "http://139.59.34.247:8080";

export const byplAddress = "http://139.59.30.199:8080";

export const activeBackend = devAddress;


// for uat
export const ONE_SIGNAL_APP_ID = "7b5d152f-7a97-479e-8461-e876941c55c4";

// for dev
//export const ONE_SIGNAL_APP_ID= "9b0a5ec6-e306-4aa7-9713-722d8ee1f47c";


export const FIREBASE_APP_ID = "701058302199";



export const ADMIN_ROLE = 'Admin';
export const USER_ROLE = 'User';

export const ACTION_FORECAST = 'FORECAST';
export const ACTION_CREATE = 'CREATE';
export const ACTION_EDIT = 'EDIT';

export const SUPPORT_NUMBER = '';

export const INGRESS_URL = activeBackend + '/et_ingress_test/rest';
export const ADMIN_URL = activeBackend + '/et_order_test/rest/';
export const ORDER_URL = activeBackend + '/et_order_test/rest/';
export const FORECAST_URL = activeBackend + '/et_forecast_test/rest/';
export const TRADE_URL = activeBackend + '/apiv1/trade';




export const DEV_FLAG = true;
export const NO_OTP_FLAG = true;
export const PRIVACY_POLICY_URL = 'https://docs.google.com/document/d/1e45gQ3-Ri6Eri9QM07hmCYfVfZfTj1ek0Iq1QGjYwxs/edit'
export const TERMS_OF_USE_URL = "https://docs.google.com/document/d/1e45gQ3-Ri6Eri9QM07hmCYfVfZfTj1ek0Iq1QGjYwxs/edit";









export const ENABLE_SERVICES = true;


/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
  // import 'zone.js/dist/zone-error';  // Included with Angular CLI.

