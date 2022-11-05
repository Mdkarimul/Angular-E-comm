import { Component, OnInit } from '@angular/core';
import { addProduct } from '../data-type';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-seller-add-product',
  templateUrl: './seller-add-product.component.html',
  styleUrls: ['./seller-add-product.component.scss']
})
export class SellerAddProductComponent implements OnInit {
addProductMessage:string|undefined;
  constructor(private product:ProductService) { }

  ngOnInit(): void {
  }

  addProductSubmit(data:addProduct){
    this.product.addProducts(data).subscribe((result)=>{
    if(result)
    {
     data.name = "";
      this.addProductMessage="Product is successfully added !";
    }
    setTimeout(()=>{
      this.addProductMessage = "";
    },3000);
    });
  }

}
