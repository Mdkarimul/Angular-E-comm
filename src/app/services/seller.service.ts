import { EventEmitter, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Signup,Login } from '../data-type';
import { BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';
@Injectable({
  providedIn: 'root'
})
export class SellerService {
 isSellerLogedIn = new BehaviorSubject<boolean>(false);
 isLoginError = new EventEmitter(false);

  constructor(private http:HttpClient,private router:Router) { }
  userSignup(data:Signup){
     this.http.post('http://localhost:3000/seller',data,{observe:'response'}).subscribe((result)=>{
      this.isSellerLogedIn.next(true);
      if(result)
      {
        localStorage.setItem('seller',JSON.stringify(result.body));
        this.router.navigate(['seller-home']);
      }
     console.log(result);
    });
  }
reloadSeller(){
  if(localStorage.getItem("seller"))
  {
    this.isSellerLogedIn.next(true);
    this.router.navigate(['seller-home']);
  }
}


userLogin(data:Login){
this.http.get(`http://localhost:3000/seller?email=${data.email}&password=${data.password}`,{observe:'response'}).subscribe((result:any)=>{
  if(result && result.body && result.body.length)
  {
    console.log("user login");
    localStorage.setItem('seller',JSON.stringify(result.body));
    this.router.navigate(['seller-home']);
  }else
  {
    console.log("login failed");
    this.isLoginError.emit(true);
  }
})
}

}
