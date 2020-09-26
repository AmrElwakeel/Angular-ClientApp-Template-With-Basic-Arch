import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { JwtHelperService } from '@auth0/angular-jwt';
import { UserToken } from '../../models/auth/tokenModel';
import { Config } from '../../configration/config';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  public constructor(private router: Router,private http : HttpClient , public jwtHelper: JwtHelperService) { }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    
      const token = localStorage.getItem('accessToken');
      if(!token){
        this.router.navigate(['/login']);
        return false;
      }
      if(this.jwtHelper.isTokenExpired(token)){
        refreshToken();
      }
    return true;
  }
  
  refreshToken(){

    const token = localStorage.getItem('accessToken');
    const refreshToken = localStorage.getItem('userRefreshToken');

    this.http.put<UserToken>(`${Config.Auth}RefreshToken`,{AccessToken:token,RefreshToken:refreshToken})
      .subscribe(
        res=>{
          localStorage.setItem('accessToken',res.AccessToken),
          localStorage.setItem('userRefreshToken',res.RefreshToken)
        }
      );
  }
}
