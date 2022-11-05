import { Component, OnInit } from '@angular/core';
import { ProductService } from '../services/product.service';
import { faIndianRupee } from '@fortawesome/free-solid-svg-icons';
import { Cart, Order } from '../data-type';
import { Router } from '@angular/router';
@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent implements OnInit {
totalPrice:number | undefined;
faIndianRupee = faIndianRupee;
cartData:Cart[] | undefined;
orderMsg:string | undefined;
  constructor(private product:ProductService,private route:Router) { }
  ngOnInit(): void {
    this.product.userCart().subscribe((result)=>{
      let price = 0;
      this.cartData = result;
      result.forEach((item)=>{
        if(item.quantity){
          price = price+(+item.price*+item.quantity);
        }
      })  
      this.totalPrice = price+(price/10)+100-(price/10);
    })
  }



  order(order:{email:string,address:string,mobile:string}){
  let user = localStorage.getItem("user");
  let userId = user && JSON.parse(user).id;
  if(this.totalPrice){
    let orderData:Order={
      ...order,
      totalPrice:this.totalPrice,
      userId,
      id:undefined
    }
    this.cartData?.forEach((item)=>{
   setTimeout(()=>{
    item.id && this.product.deleteCartItem(item.id);
   },5000)
    })

    this.product.orderPlace(orderData).subscribe((result)=>{
  console.log(result);
  console.log("Order placed");
  if(result){
    this.orderMsg = "Your order has been placed";
    setTimeout(()=>{
      this.orderMsg = undefined;
      this.route.navigate(['/my-order']);
    },3000)
  }
    });
  }

  }

}
