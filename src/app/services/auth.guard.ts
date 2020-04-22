import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Storage } from '@ionic/storage';
import { IngressService } from './ingress.service';


@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router
    , private storage: Storage
    , private ingressService: IngressService
    ) { }

  async canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    console.log("inside auth guard service");
    if (await this.ingressService.getUserIdToken()) {
      console.log(this.ingressService.getUserIdToken());
      return true;
    }
    this.router.navigate(['/login'], {
      queryParams: {
        redirect: state.url
      }
    });
    return true;
  }
}
