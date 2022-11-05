import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { addProduct } from '../data-type';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-seller-product-update',
  templateUrl: './seller-product-update.component.html',
  styleUrls: ['./seller-product-update.component.scss']
})
export class SellerProductUpdateComponent implements OnInit {
updateProductMessage:string|undefined;
productData:undefined | addProduct;
  constructor(private route:ActivatedRoute,private product:ProductService) { }

  ngOnInit(): void {
    let productId = this.route.snapshot.paramMap.get('id');
    this.product.getProduct(productId).subscribe((data)=>{
    this.productData = data;
    });
  }
  updateProductSubmit(data:addProduct){
    console.log(data);
    if(this.productData){
      data.id = this.productData.id;
    }
this.product.updateProduct(data).subscribe((result)=>{
  console.log(result);
 if(result){
 this.updateProductMessage = "Product has updated !";
 }
});
setTimeout(()=>{
  this.updateProductMessage = undefined;
},3000);
  }

}
