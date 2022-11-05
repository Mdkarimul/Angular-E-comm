
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { addProduct } from '../data-type';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
menuType:string = 'default';
sellerName:string = '';
userName:string = '';
cartItem = 0;
searchResult:undefined | addProduct[];
  constructor(private route:Router,private product:ProductService) {}

  ngOnInit(): void {
  this.route.events.subscribe((val:any)=>{
   if(val.url)
   {
    if(localStorage.getItem("seller") && val.url.includes("seller"))
    {
      this.menuType = "seller";
      if(localStorage.getItem('seller'))
      {
        let sellerStore = localStorage.getItem("seller");
        let sellerData = sellerStore && JSON.parse(sellerStore)[0];
        this.sellerName = sellerData.name;
      }
    }else if(localStorage.getItem('user')){
    let userStore = localStorage.getItem("user");
    let userData = userStore && JSON.parse(userStore);
    this.userName = userData.name;
    this.menuType = 'user';
    this.product.getCartList(userData.id);
    }
    else
    {
      this.menuType = "default";
    }
   }
  });


  let cartData = localStorage.getItem("localCart");
  if(cartData){
    this.cartItem = JSON.parse(cartData).length;
  }
  this.product.cartData.subscribe((items)=>{
    this.cartItem = items.length;
  });



  }

  logout(){
    localStorage.removeItem("seller");
    this.route.navigate(['/']);
  }

  searchProduct(query:KeyboardEvent){
if(query)
{
  const element = query.target as HTMLInputElement;
  this.product.searchProduct(element.value).subscribe((result)=>{
    if(result.length >5)
    {
      result.length = 5;
    }
      this.searchResult = result;
  })
}
  }

  hideSearch(){
    this.searchResult = undefined;
  }
  redirectToDetails(id:number){
    this.route.navigate(['/product-details/'+id])
  }
  getSearch(val:string){
    if(val){
      this.route.navigate([`search-result/${val}`]);
    }
    else{
      alert("Enter something here");
    }
  }

  userLogout(){
    localStorage.removeItem("user");
    this.route.navigate(['/user-auth']);
    this.product.cartData.emit([]);
  }
 

}
