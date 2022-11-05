import { Component, OnInit } from '@angular/core';
import { Order } from '../data-type';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-my-order',
  templateUrl: './my-order.component.html',
  styleUrls: ['./my-order.component.scss']
})
export class MyOrderComponent implements OnInit {
orderData:Order[]|undefined;
  constructor(private product:ProductService) { }

  ngOnInit(): void {
    this.getOrderList();
  }

  cancleOrder(orderId:number|undefined){
   orderId && this.product.deleteOrder(orderId).subscribe(()=>{
   this.getOrderList();
   });
  }

  getOrderList(){
    this.product.orderList().subscribe((result)=>{
      this.orderData = result;
      });
  }

}
