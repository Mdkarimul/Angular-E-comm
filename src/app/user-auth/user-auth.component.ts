import { JsonPipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { addProduct, Cart, Login, Signup } from '../data-type';
import { ProductService } from '../services/product.service';
import { UsersService } from '../services/users.service';

@Component({
  selector: 'app-user-auth',
  templateUrl: './user-auth.component.html',
  styleUrls: ['./user-auth.component.scss']
})
export class UserAuthComponent implements OnInit {
  authError:string = '';
  showLogin:boolean = true;
  constructor(private user:UsersService,private product:ProductService) { }

  ngOnInit(): void {
    this.user.userAuthReload();

  }

  signup(data:Signup){
    this.user.userSignup(data);
  }

  login(data:Login){
this.user.userLogin(data);
this.user.invalidUserAuth.subscribe((result)=>{
 if(result)
 {
this.authError = "Please enter valid cradential";
setTimeout(()=>{
  this.authError = '';
},3000)
 }else{
  setTimeout(()=>{
    this.localCartToRemoteCart();
  },2000)

 }
});
  }
  

  openSignup(){
  this.showLogin = false;
  }
  openLogin(){
 this.showLogin = true;
  }

  localCartToRemoteCart(){
let data = localStorage.getItem("localCart");
let user = localStorage.getItem("user");
let userId = user && JSON.parse(user).id;
if(data){
  let cartDataToList:addProduct[] = JSON.parse(data);
 cartDataToList.forEach((product:addProduct,index)=>{
let cartData:Cart = {
  ...product,
  productId:product.id,
  userId
}
delete cartData.id;
setTimeout(()=>{
  this.product.addToCart(cartData).subscribe((result)=>{
    if(result){
      console.log(result);
    }
    });
    if(cartDataToList.length==index+1){
      localStorage.removeItem('localCart');
    }
},500);
 })
}
setTimeout(()=>{
  this.product.getCartList(userId);
},2000)
  }

}
