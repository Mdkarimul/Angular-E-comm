import { Component, OnInit } from '@angular/core';
import { pipe } from 'rxjs';
import { Cart, PriceSummary } from '../data-type';
import { ProductService } from '../services/product.service';
import { faIndianRupee } from '@fortawesome/free-solid-svg-icons';
import { Router } from '@angular/router';
@Component({
  selector: 'app-cart-page',
  templateUrl: './cart-page.component.html',
  styleUrls: ['./cart-page.component.scss']
})
export class CartPageComponent implements OnInit {
cartdata:Cart[] | undefined;
priceSummary:PriceSummary={
  price:0,
  discount:0,
  tax:0,
  delivary:0,
  total:0
};
faIndianRupee =faIndianRupee;
  constructor(private product:ProductService,private route:Router) { }

  ngOnInit(): void {
  this.loadCartDetails();
  }

  checkOut(){
    this.route.navigate(['/checkout']);
  }



loadCartDetails(){
  this.product.userCart().subscribe((result)=>{
    this.cartdata = result;
    let price = 0;
    result.forEach((item)=>{
      if(item.quantity){
        price = price+(+item.price*+item.quantity);
      }
    })
    this.priceSummary.price = price;
    this.priceSummary.discount  =price/10;
    this.priceSummary.tax = price/10;
    this.priceSummary.delivary=100;
    this.priceSummary.total = this.priceSummary.price+this.priceSummary.delivary+this.priceSummary.discount+this.priceSummary.tax;
  if(!this.cartdata.length)
  {
this.route.navigate(['/'])
  }
  })
}



  removeToCart(cartId:number|undefined){
    cartId && this.cartdata && this.product.removeToCart(cartId).subscribe((result)=>{
     this.loadCartDetails();
     });
  }

}
