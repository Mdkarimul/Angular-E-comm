import { Component, OnInit } from '@angular/core';
import { SellerService } from '../services/seller.service';
import { Router } from '@angular/router';
import { Signup,Login } from '../data-type';
@Component({
  selector: 'app-seller-auth',
  templateUrl: './seller-auth.component.html',
  styleUrls: ['./seller-auth.component.scss']
})
export class SellerAuthComponent implements OnInit {
 showLogin:boolean = false;
authError:string ='';

  constructor(private seller:SellerService,private router:Router) { }

  ngOnInit(): void {
    this.seller.reloadSeller();
  }
  signup(data:Signup):void{
    this.seller.userSignup(data);
  }
  login(data:Login):void{
    this.authError = "";
    this.seller.userLogin(data);
    this.seller.isLoginError.subscribe((isError)=>{
  if(isError)
  {
  this.authError = "Email or password is not correct";
  }
    })
  }
  openLogin(){
   this.showLogin = true;
  }
  openSignup(){
    this.showLogin = false;
  }

}
