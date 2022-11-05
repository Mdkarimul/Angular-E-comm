import { Component, OnInit } from '@angular/core';
import { addProduct } from '../data-type';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
popularProducts:undefined | addProduct[];
trendingProducts:undefined | addProduct[];
  constructor(private product:ProductService) { }

  ngOnInit(): void {
    this.product.popularProducts().subscribe((data)=>{
      this.popularProducts = data;
    });
    this.product.trendingProduct().subscribe((data)=>{
  this.trendingProducts = data;
    })
  }

}
