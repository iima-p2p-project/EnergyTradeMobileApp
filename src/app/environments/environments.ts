// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
    production: false
  };

  export const ADMIN_ROLE = 'Admin';
  export const USER_ROLE = 'User';

  export const ACTION_CREATE = 'CREATE';
  export const ACTION_EDIT = 'EDIT';
  
  export const SUPPORT_NUMBER = '8298916264';
  
  export const INGRESS_URL = 'http://103.120.179.22:8080/et_ingress/rest';
  export const ADMIN_URL = 'http://103.120.179.22:8080/et_order/rest/';
  export const ORDER_URL = 'http://103.120.179.22:8080/et_order/rest/';
  export const TRADE_URL = 'http://139.59.30.90:3000/apiv1/trade';


  export const CONFIG_URL = 'http://103.120.179.22:3007/configurations';
  
  export const DEV_FLAG = true;
  export const NO_OTP_FLAG = true;
  export const PRIVACY_POLICY_URL = 'http://www.jeerapowder.com/assets/PRIVACY%20POLICY-%20JeeraPowder%20V1.0.pdf'
  export const TERMS_OF_USE_URL = "http://www.jeerapowder.com/assets/TERMS%20OF%20USE%20JeeraPowder%20V1.1.pdf";
  export const SELECTION_URL = 'http://103.120.179.22:8080/jp_smo';
  export const ABOUT_URL = 'http://www.jeerapowder.com/#about';
  
  export const BOOKING_URL = 'http://103.120.179.22:3010/booking';
  
  export const ADDRESS_URL = 'http://103.120.179.22:8080/jp_ingress/addAddress/';
  
  export const RAZORPAY_KEY_TESTMODE = 'rzp_test_aXUcqap2uvztFR';
  export const RAZORPAY_KEY_SECRET_TESTMODE = 'Dfgpb6CgG79Aik3ei17W7t7p';
  
  export const RAZORPAY_KEY_LIVEMODE = 'rzp_live_jRNmDzJmaW6nws';
  export const RAZORPAY_KEY_SECRET_LIVEMODE = 'B3bd9RShQ4Xk7UxfAZOsEbWB';
  
  
  export const IMAGE_REPO = 'http://103.120.179.22:8080/ufs/';
  
  export const OFFERS_URL = 'http://103.120.179.22:8080/jp_ofrmo';
  
  export const TAX_PERCENT = 18;
  export const ENABLE_LIVE_PAYMENT = true;
  export const ENABLE_SERVICES = true;
  
  
  /*
   * For easier debugging in development mode, you can import the following file
   * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
   *
   * This import should be commented out in production mode because it will have a negative impact
   * on performance if an error is thrown.
   */
  // import 'zone.js/dist/zone-error';  // Included with Angular CLI.
  
  