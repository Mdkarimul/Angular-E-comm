import { Component, OnInit,OnChanges, SimpleChanges } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { addProduct } from '../data-type';
import { ProductService } from '../services/product.service';
@Component({
  selector: 'app-search-result',
  templateUrl: './search-result.component.html',
  styleUrls: ['./search-result.component.scss']
})
export class SearchResultComponent implements OnInit {
searchResult:undefined | addProduct[];
  constructor(private route:ActivatedRoute,private product:ProductService) { }

  ngOnInit(): void {
    let query = this.route.snapshot.paramMap.get('query');
    console.log(query);
    query && this.product.searchProduct(query).subscribe((result)=>{
   this.searchResult = result;
    });
  }


}
