import { HttpClient } from '@angular/common/http';
import { ReturnStatement } from '@angular/compiler';
import { EventEmitter, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { addProduct, Cart, Order } from '../data-type';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
 cartData =new EventEmitter<addProduct[] | []>(); 
  constructor(private http:HttpClient) { }

  addProducts(data:addProduct){
  return this.http.post("http://localhost:3000/seller-product",data);
  }

  productList():Observable<addProduct[]>{
    return this.http.get<addProduct[]>("http://localhost:3000/seller-product");
  }
  deleteProduct(id:number){
 return this.http.delete(`http://localhost:3000/seller-product/${id}`);
  }
  getProduct(id:string|null){
  return this.http.get<addProduct>(`http://localhost:3000/seller-product/${id}`);
  }
  updateProduct(data:addProduct){
    console.log(data.id);
 return this.http.put<addProduct>(`http://localhost:3000/seller-product/${data.id}`,data);
  }

  popularProducts(){
    return this.http.get<addProduct[]>("http://localhost:3000/seller-product?_limit=3");
  }

  trendingProduct(){
    return this.http.get<addProduct[]>("http://localhost:3000/seller-product?_limit=8");
  }

  searchProduct(query:string){
    return this.http.get<addProduct[]>(`http://localhost:3000/seller-product?q=${query}`);
  }
  localAddToCart(data:addProduct){
   let cartData = [];
   let localCart = localStorage.getItem("localCart");
   if(!localCart)
   {
    localStorage.setItem("localCart",JSON.stringify([data]));
    this.cartData.emit([data]);
   }else{
    cartData = JSON.parse(localCart);
    cartData.push(data);
    localStorage.setItem("localCart",JSON.stringify(cartData))
   }
   this.cartData.emit(cartData);
  }
  removeItemFromCart(productId:number){
    let cardData  = localStorage.getItem("localCart");
    if(cardData){
      let items:addProduct[] = JSON.parse(cardData);
      items = items.filter((item:addProduct)=>productId !== item.id);
      localStorage.setItem("localCart",JSON.stringify(items));
      this.cartData.emit(items);
    }
  }

  addToCart(cartData:Cart){
  return this.http.post("http://localhost:3000/cart",cartData);
  }

  getCartList(userId:number){
   this.http.get<addProduct[]>(`http://localhost:3000/cart?userId=${userId}`,{observe:'response'}).subscribe((result)=>{
  console.log(result);
   if(result && result.body){
    this.cartData.emit(result.body);
  }
   });
  }

  removeToCart(cartId:number){
    return this.http.delete("http://localhost:3000/cart/"+cartId);
  }

  userCart(){
    let userStore = localStorage.getItem("user");
    let userData = userStore && JSON.parse(userStore);
    return this.http.get<Cart[]>("http://localhost:3000/cart?userId="+userData.id);
  }

  orderPlace(data:Order){
return this.http.post("http://localhost:3000/orders",data);
  }

  orderList(){
    let userStore = localStorage.getItem("user");
    let userData = userStore && JSON.parse(userStore);
    return this.http.get<Order[]>("http://localhost:3000/orders?userId="+userData.id);
  }

  deleteCartItem(cartId:number|undefined){
     this.http.delete("http://localhost:3000/cart/"+cartId,{observe:'response'}).subscribe((result)=>{
     if(result){
      this.cartData.emit([]);
     }
     });
  }

  deleteOrder(orderId:number){
   return this.http.delete("http://localhost:3000/orders/"+orderId);
  }


}


