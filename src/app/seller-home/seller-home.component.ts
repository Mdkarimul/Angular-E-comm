import { Component, OnInit } from '@angular/core';
import { addProduct } from '../data-type';
import { ProductService } from '../services/product.service';
import { faTrash,faEdit } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-seller-home',
  templateUrl: './seller-home.component.html',
  styleUrls: ['./seller-home.component.scss']
})
export class SellerHomeComponent implements OnInit {
  faTrash = faTrash;
  faEdit=faEdit;
public allProducts:addProduct[] | undefined;
public productDeleteMessage:string|undefined;
  constructor(private product:ProductService) { }
  
  ngOnInit(): void {
     this.productList();
  }

  deleteProduct(id:number){
    this.product.deleteProduct(id).subscribe((result)=>{
   if(result)
   {
   this.productDeleteMessage = "Product is deleted successfully !";
   this.productList();
   }
    });
    setTimeout(()=>{
  this.productDeleteMessage = undefined;
    },3000);
  }

  productList(){
    this.product.productList().subscribe((result)=>{
      this.allProducts = result;
    });
  }

}
