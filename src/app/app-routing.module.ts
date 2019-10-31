import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'create-account',
    pathMatch: 'full'
  },
  /*{
    path: '',
    loadChildren: () => import('src/app/pages/dashboard/dashboard.module').then(m => m.DashboardPageModule)
  },*/
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then(m => m.HomePageModule)
  },
  {
    path: 'list',
    loadChildren: () => import('./list/list.module').then(m => m.ListPageModule)
  },
  { path: 'login', loadChildren: './pages/login/login.module#LoginPageModule' },
  { path: 'register', loadChildren: './pages/register/register.module#RegisterPageModule' },
  { path: 'add-device', loadChildren: './pages/add-device/add-device.module#AddDevicePageModule' },
  { path: 'create-account', loadChildren: './pages/create-account/create-account.module#CreateAccountPageModule' },
  { path: 'otp', loadChildren: './pages/otp/otp.module#OtpPageModule' },
  { path: 'device-details', loadChildren: './pages/device-details/device-details.module#DeviceDetailsPageModule' },
  { path: 'dashboard', loadChildren: './pages/dashboard/dashboard.module#DashboardPageModule' },
  { path: 'sell-time-picker', loadChildren: './pages/sell-time-picker/sell-time-picker.module#SellTimePickerPageModule' },
  { path: 'sell-rate-set', loadChildren: './pages/sell-rate-set/sell-rate-set.module#SellRateSetPageModule' },
  { path: 'buy-time-picker', loadChildren: './pages/buy-time-picker/buy-time-picker.module#BuyTimePickerPageModule' },
  { path: 'seller-list', loadChildren: './pages/seller-list/seller-list.module#SellerListPageModule' },
  { path: 'order-details', loadChildren: './pages/order-details/order-details.module#OrderDetailsPageModule' },
  { path: 'sell-post-success', loadChildren: './pages/sell-post-success/sell-post-success.module#SellPostSuccessPageModule' },
  { path: 'buy-post-success', loadChildren: './pages/buy-post-success/buy-post-success.module#BuyPostSuccessPageModule' },
  { path: 'manage-orders', loadChildren: './pages/manage-orders/manage-orders.module#ManageOrdersPageModule' },
  { path: 'buy-power', loadChildren: './pages/buy-power/buy-power.module#BuyPowerPageModule' },
  { path: 'sell-power', loadChildren: './pages/sell-power/sell-power.module#SellPowerPageModule' },
  { path: 'forecast-list', loadChildren: './pages/forecast-list/forecast-list.module#ForecastListPageModule' },
  { path: 'total-sell-leads', loadChildren: './total-sell-leads/total-sell-leads.module#TotalSellLeadsPageModule' },
  { path: 'total-buy-leads', loadChildren: './total-buy-leads/total-buy-leads.module#TotalBuyLeadsPageModule' },
  { path: 'profile', loadChildren: './profile/profile.module#ProfilePageModule' },
  { path: 'non-trade-hours', loadChildren: './non-trade-hours/non-trade-hours.module#NonTradeHoursPageModule' },
  { path: 'cancel-non-trade-hour', loadChildren: './cancel-non-trade-hour/cancel-non-trade-hour.module#CancelNonTradeHourPageModule' },
  { path: 'cancel-in-profile', loadChildren: './cancel-in-profile/cancel-in-profile.module#CancelInProfilePageModule' },
  { path: 'admin-dashboard', loadChildren: './admin-dashboard/admin-dashboard.module#AdminDashboardPageModule' },
  { path: 'schedule', loadChildren: './schedule/schedule.module#SchedulePageModule' },
  { path: 'admin-edit', loadChildren: './admin-edit/admin-edit.module#AdminEditPageModule' },
  { path: 'modal-edit', loadChildren: './modal-edit/modal-edit.module#ModalEditPageModule' }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
