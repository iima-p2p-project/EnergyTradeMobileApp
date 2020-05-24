import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from 'src/app/services/auth.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'dashboard',
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
  {
    path: 'dashboard',
    loadChildren: 'src/app/pages/dashboard/dashboard.module#DashboardPageModule',
    canActivate: [AuthGuard]
  },
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
  { path: 'forecast-list', loadChildren: './pages/forecast-list/forecast-list.module#ForecastListPageModule', canActivate: [AuthGuard] },
  { path: 'total-sell-leads', loadChildren: './pages/total-sell-leads/total-sell-leads.module#TotalSellLeadsPageModule' },
  { path: 'total-buy-leads', loadChildren: './pages/total-buy-leads/total-buy-leads.module#TotalBuyLeadsPageModule' },
  { path: 'profile', loadChildren: './pages/profile/profile.module#ProfilePageModule' },
  { path: 'non-trade-hours', loadChildren: './pages/non-trade-hours/non-trade-hours.module#NonTradeHoursPageModule' },
  { path: 'cancel-non-trade-hour', loadChildren: './pages/cancel-non-trade-hour/cancel-non-trade-hour.module#CancelNonTradeHourPageModule' },
  { path: 'cancel-in-profile', loadChildren: './pages/cancel-in-profile/cancel-in-profile.module#CancelInProfilePageModule' },
  { path: 'admin-dashboard', loadChildren: './pages/admin-dashboard/admin-dashboard.module#AdminDashboardPageModule', canActivate: [AuthGuard] },
  { path: 'schedule', loadChildren: './pages/schedule/schedule.module#SchedulePageModule' },
  { path: 'admin-edit', loadChildren: './pages/admin-edit/admin-edit.module#AdminEditPageModule' },
  { path: 'modal-edit', loadChildren: './pages/modal-edit/modal-edit.module#ModalEditPageModule' },
  { path: 'customers', loadChildren: './pages/customers/customers.module#CustomersPageModule' },
  { path: 'forecast-empty', loadChildren: './forecast-empty/forecast-empty.module#ForecastEmptyPageModule' },
  { path: 'dashboard-empty', loadChildren: './dashboard-empty/dashboard-empty.module#DashboardEmptyPageModule' },
  { path: 'manage-orders-empty', loadChildren: './manage-orders-empty/manage-orders-empty.module#ManageOrdersEmptyPageModule' },
  { path: 'notifications-empty', loadChildren: './notifications-empty/notifications-empty.module#NotificationsEmptyPageModule' },
  { path: 'admin-dashboard-empty', loadChildren: './admin-dashboard-empty/admin-dashboard-empty.module#AdminDashboardEmptyPageModule' },
  { path: 'connection-lost', loadChildren: './connection-lost/connection-lost.module#ConnectionLostPageModule' },
  { path: 'something-went-wrong-blue', loadChildren: './something-went-wrong-blue/something-went-wrong-blue.module#SomethingWentWrongBluePageModule' },
  { path: 'something-went-wrong-white', loadChildren: './something-went-wrong-white/something-went-wrong-white.module#SomethingWentWrongWhitePageModule' },
  { path: 'alert-test', loadChildren: './alert-test/alert-test.module#AlertTestPageModule' },
  { path: 'end-date-modal', loadChildren: './end-date-modal/end-date-modal.module#EndDateModalPageModule' },
  { path: 'invalid-input-modal', loadChildren: './invalid-input-modal/invalid-input-modal.module#InvalidInputModalPageModule' },
  { path: 'error404-modal', loadChildren: './error404-modal/error404-modal.module#Error404ModalPageModule' },
  { path: 'non-trade-hours-alert', loadChildren: './non-trade-hours-alert/non-trade-hours-alert.module#NonTradeHoursAlertPageModule' },
  { path: 'cancel-order-modal1', loadChildren: './cancel-order-modal1/cancel-order-modal1.module#CancelOrderModal1PageModule' },
  { path: 'cancel-order-modal2', loadChildren: './cancel-order-modal2/cancel-order-modal2.module#CancelOrderModal2PageModule' },
  { path: 'non-trade-post-success', loadChildren: './pages/non-trade-post-success/non-trade-post-success.module#NonTradePostSuccessPageModule' },
  { path: 'statement', loadChildren: './pages/statement/statement.module#StatementPageModule' },
  { path: 'customer-register', loadChildren: './DR/pages/customer-register/customer-register.module#CustomerRegisterPageModule' },
  { path: 'customer-dashboard', loadChildren: './DR/pages/customer-dashboard/customer-dashboard.module#CustomerDashboardPageModule', canActivate: [AuthGuard] },
  { path: 'notifications', loadChildren: './pages/notifications/notifications.module#NotificationsPageModule', canActivate: [AuthGuard] },
  { path: 'user-profile', loadChildren: './pages/user-profile/user-profile.module#UserProfilePageModule', canActivate: [AuthGuard] },
  { path: 'events', loadChildren: './pages/events/events.module#EventsPageModule' },
  { path: 'event-details', loadChildren: './pages/event-details/event-details.module#EventDetailsPageModule' },
  { path: 'event-detail-edit', loadChildren: './pages/event-detail-edit/event-detail-edit.module#EventDetailEditPageModule' },
  { path: 'add-assets', loadChildren: './pages/add-assets/add-assets.module#AddAssetsPageModule' },
  { path: 'edit-event-modal', loadChildren: './modals/edit-event-modal/edit-event-modal.module#EditEventModalPageModule' },
  { path: 'withdraw-event-modal', loadChildren: './modals/withdraw-event-modal/withdraw-event-modal.module#WithdrawEventModalPageModule' },
  { path: 'edit-bid-modal', loadChildren: './modals/edit-bid-modal/edit-bid-modal.module#EditBidModalPageModule' },
  { path: 'delete-modal', loadChildren: './modals/delete-modal/delete-modal.module#DeleteModalPageModule' },
  { path: 'all-dr-event-sets', loadChildren: './DR/pages/all-dr-event-sets/all-dr-event-sets.module#AllDrEventSetsPageModule', canActivate: [AuthGuard] },
  { path: 'event-set-details', loadChildren: './DR/pages/event-set-details/event-set-details.module#EventSetDetailsPageModule' },
  { path: 'choose-user-type', loadChildren: './DR/pages/choose-user-type/choose-user-type.module#ChooseUserTypePageModule' },
  { path: 'create-dr-user-account', loadChildren: './DR/pages/create-dr-user-account/create-dr-user-account.module#CreateDrUserAccountPageModule' },
  { path: 'scheduled-event-set-details', loadChildren: './DR/pages/scheduled-event-set-details/scheduled-event-set-details.module#ScheduledEventSetDetailsPageModule' },
  { path: 'druser-profile', loadChildren: './DR/pages/druser-profile/druser-profile.module#DRUserProfilePageModule', canActivate: [AuthGuard] },
  { path: 'add-drasset', loadChildren: './DR/pages/add-drasset/add-drasset.module#AddDRAssetPageModule', canActivate: [AuthGuard] },
  { path: 'contract-details', loadChildren: './DR/pages/contract-details/contract-details.module#ContractDetailsPageModule', canActivate: [AuthGuard] },





];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
