import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { addProduct, Cart } from '../data-type';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss']
})
export class ProductDetailsComponent implements OnInit {
productdata:undefined | addProduct;
productQuantity:number = 1;
removeCart= false;
cartData:addProduct| undefined;
  constructor(private route:ActivatedRoute,private product:ProductService) { }

  ngOnInit(): void {
    let productId = this.route.snapshot.paramMap.get('id');
   productId && this.product.getProduct(productId).subscribe((result)=>{
      this.productdata = result;
    });


    let cartData = localStorage.getItem('localCart');
    if(productId && cartData){
      let items = JSON.parse(cartData);
      items = items.filter((item:addProduct)=>productId ==item.id.toString());
      if(items.length !==0)
      {
        this.removeCart = true;
      }else{
        this.removeCart = false;
      }
    }
      let user = localStorage.getItem("user");
      if(user){
        let userId = user && JSON.parse(user).id;
        this.product.getCartList(userId);
        this.product.cartData.subscribe((result)=>{
     let items =  result.filter((item:addProduct)=>productId?.toString() === item.productId?.toString())
    if(items.length)
    {
  this.cartData = items[0]
  this.removeCart = true;
    }    
    })
      }
    
  }

  handleQuantity(val:string){
   if(this.productQuantity < 20 && val==="plus")
   {
    this.productQuantity = this.productQuantity+1;
   }
   else if(this.productQuantity>1 && val==="min")
   {
    this.productQuantity = this.productQuantity-1;
   }
  }

  addToCart(){
    if(this.productdata)
    {
      this.productdata.quantity = this.productQuantity;
      if(!localStorage.getItem("user")){
        this.product.localAddToCart(this.productdata);
        this.removeCart = true;
      }else{
        let user = localStorage.getItem("user");
        let userId = user && JSON.parse(user).id;
        let cartData:Cart = {
          ...this.productdata,
          userId,
          productId:this.productdata.id
        } 
        delete cartData.id;
        this.product.addToCart(cartData).subscribe((result)=>{
       this.product.getCartList(userId);
       this.removeCart = true;
        });
      }
    }
  }

  removeToCart(productId:number){
    if(!localStorage.getItem("user")){
      this.product.removeItemFromCart(productId);
      this.removeCart = false;
    }else{
      let user = localStorage.getItem("user");
      let userId = user && JSON.parse(user).id;
     this.cartData && this.product.removeToCart(this.cartData.id).subscribe((result)=>{
     if(result){
      this.product.getCartList(userId);
     }
     });
    }
  this.removeCart = false;
  }


}
